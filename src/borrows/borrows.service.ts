import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus } from './borrow-status.enum';
import { AddBorrowDto } from './dto/create-borrow.dto';
import { GetBorrowFilterDto } from './dto/get-borrow-filter.dto';
import { BorrowInfo } from './entities/borrow.entity';
import { Repository,Equal,Not,MoreThanOrEqual } from 'typeorm';
import { ethers,utils,BigNumber } from 'ethers';
import  Web3Modal  from 'web3modal'
import { BorrowerInfo } from './entities/borrower.entity';
import { WithdrawDto } from './dto/withdraw.dto';
import { GetBorrowDeposit } from './dto/get-borrow-deposit.dto';
import { CriticalPositions } from './entities/liquidation.entity';
import {
    borrowAddress,cdsAddress,treasuryAddress,optionsAddress,
    borrowABI,cdsABI
} from '../utils/index';
import { GetBorrowDepositByChainId } from './dto/get-borrow-deposit-by-chainid.dto';
import { GlobalService } from 'src/global/global.service';
import { Cron,CronExpression } from '@nestjs/schedule';
require('dotenv').config();

@Injectable()
export class BorrowsService {

    constructor(
        @InjectRepository(BorrowInfo)
        private borrowRepository: Repository<BorrowInfo>,
        @InjectRepository(BorrowerInfo)
        private borrowerRepository: Repository<BorrowerInfo>,
        @InjectRepository(CriticalPositions)
        private criticalPositionsRepository: Repository<CriticalPositions>,
        private globalService:GlobalService
    ){}


    getDeposits(getBorrowFilterDto:GetBorrowFilterDto):Promise<BorrowInfo[]>{
        const {
            address,
            collateralType,
            index,
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            status} = getBorrowFilterDto;
        const query = this.borrowRepository.createQueryBuilder('deposit');

        if(collateralType){
            query.andWhere('deposit.collateralType = :collateralType',{collateralType});
        }
        if(index){
            query.andWhere('deposit.index = :index',{index});
        }
        if(depositedAmount){
            query.andWhere('deposit.depositedAmount = :depositedAmount',{depositedAmount});
        }
        if(depositedTime){
            query.andWhere('deposit.depositedTime = :depositedTime',{depositedTime});
        }
        if(ethPrice){
            query.andWhere('deposit.ethPrice = :ethPrice',{ethPrice});
        }
        if(noOfAmintMinted){
            query.andWhere('deposit.noOfAmintMinted = :noOfAmintMinted',{noOfAmintMinted});
        }
        if(strikePrice){
            query.andWhere('deposit.strikePrice = :strikePrice',{strikePrice});
        }
        if(status){
            query.andWhere('deposit.status = :status',{status});
        }
        const deposits = query.getMany();
        return deposits;
    }

    async getDepositsById(id:string):Promise<BorrowInfo>{
        const found = await this.borrowRepository.findOne({where:{id:id}});
        if(!found){
            throw new NotFoundException(`Deposit with ID "${id}" not found`);
        }else{
            return found;
        }
    }

    async getBorrowDeposit(getBorrowDeposit:GetBorrowDeposit):Promise<BorrowInfo>{
        const{address,index,chainId} = getBorrowDeposit;
        const found = await this.borrowRepository.findOne(
            {where:{
                address:address,
                chainId:chainId,
                index:index
            }});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" & index "${index}" not found`);
        }else{
            return found;
        }
    }

    async getDepositorByAddress(address:string):Promise<BorrowerInfo>{
        const found = await this.borrowerRepository.findOne({where:{address:address}});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" not found`);
        }else{
            return found;
        }
    }

    async getDepositorIndexByAddress(address:string,chainId:number):Promise<number>{
        const found = await this.borrowerRepository.findOne({where:{address}});
        if(!found){
            return 0;
        }else{
            if(chainId == 11155111){
                return found.totalIndexInEthereum ? found.totalIndexInEthereum : 0;
            }else if(chainId == 80001){
                return found.totalIndexInPolygon ? found.totalIndexInPolygon : 0;
            }
        }
    }

    async getDepositsByChainId(address:string,chainId:number):Promise<BorrowInfo[]>{
        const found = await this.borrowRepository.findBy({
            address:Equal(address),
            chainId:Equal(chainId)
        })
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" & chainID "${chainId}" not found`);
        }else{
            return found;
        }
    }

    async addBorrow(addBorrowDto:AddBorrowDto):Promise<BorrowInfo>{
        const{
            address,
            chainId,
            collateralType,
            index,
            downsideProtectionPercentage,
            aprAtDeposit,
            depositedAmount,
            normalizedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePricePercent
        } = addBorrowDto;

        const currentIndex = await this.getDepositorIndexByAddress(address,chainId);
        const strikePrice = (ethPrice * (1 + strikePricePercent/100));
        if(currentIndex == (index-1) || currentIndex == 0){
            const liquidationEthPrice = (ethPrice*80)/100;
            const criticalEthPrice = (ethPrice*83)/100;
            const borrow = this.borrowRepository.create({
                address,
                index,
                chainId,
                collateralType,
                downsideProtectionPercentage,
                aprAtDeposit,
                depositedAmount,
                normalizedAmount,
                depositedTime,
                ethPrice,
                liquidationEthPrice,
                criticalEthPrice,
                noOfAmintMinted,
                strikePrice,
                status:PositionStatus.DEPOSITED
            });

            let borrower = await this.borrowerRepository.findOne({where:{address}});

            if(!borrower){
                borrower = new BorrowerInfo();
                if(chainId == 11155111){
                    borrower.totalDepositedAmountInEthereum = parseFloat(depositedAmount);
                    borrower.totalAmintInEthereum = parseFloat(noOfAmintMinted);
                    borrower.totalAbondInEthereum = 0;
                    borrower.totalIndexInEthereum = index;
                }else if(chainId == 80001){
                    borrower.totalDepositedAmountInPolygon = parseFloat(depositedAmount);
                    borrower.totalAmintInPolygon = parseFloat(noOfAmintMinted);
                    borrower.totalAbondInPolygon = 0;
                    borrower.totalIndexInPolygon = index;
                }
                borrower.borrows = [borrow];
            }else{
                if(chainId == 11155111){
                    if(borrower.totalIndexInEthereum){
                        borrower.totalDepositedAmountInEthereum = parseFloat(borrower.totalDepositedAmountInEthereum.toString()) + parseFloat(depositedAmount);
                        borrower.totalAmintInEthereum = parseFloat(borrower.totalAmintInEthereum.toString()) +  parseFloat(noOfAmintMinted);
                    }else{
                        borrower.totalDepositedAmountInEthereum = parseFloat(depositedAmount);
                        borrower.totalAmintInEthereum = parseFloat(noOfAmintMinted);
                        borrower.totalAbondInEthereum = 0;
                    }
                    borrower.totalIndexInEthereum = index;
                }else if(chainId == 80001){
                    if(borrower.totalIndexInPolygon){
                        borrower.totalDepositedAmountInPolygon = parseFloat(borrower.totalDepositedAmountInPolygon.toString()) + parseFloat(depositedAmount);
                        borrower.totalAmintInPolygon = parseFloat(borrower.totalAmintInPolygon.toString()) +  parseFloat(noOfAmintMinted);  
                    }else{
                        borrower.totalDepositedAmountInPolygon = parseFloat(depositedAmount);
                        borrower.totalAmintInPolygon = parseFloat(noOfAmintMinted);
                        borrower.totalAbondInPolygon = 0;
                    }
                    borrower.totalIndexInPolygon = index;
                }
                borrower.borrows.push(borrow);
            }
            borrower.address = address;

            if(chainId == 80001){
                if(this.globalService.getTreasuryEthBalancePolygon == null){
                    this.globalService.setTreasuryEthBalancePolygon(parseFloat(depositedAmount)); 
                }else{
                    this.globalService.setTreasuryEthBalancePolygon(parseFloat(this.globalService.getTreasuryEthBalancePolygon.toString()) + parseFloat(depositedAmount)); 
                }
            }else if(chainId == 11155111){
                if(this.globalService.getTreasuryEthBalancePolygon == null){
                    this.globalService.setTreasuryEthBalancePolygon(parseFloat(depositedAmount)); 
                }else{
                    this.globalService.setTreasuryEthBalancePolygon(parseFloat(this.globalService.getTreasuryEthBalancePolygon.toString()) + parseFloat(depositedAmount)); 
                }
            }

            await this.borrowRepository.save(borrow);
            await this.borrowerRepository.save(borrower);
            return borrow;
        }else{
            return ;
        }
    }

    async withdraw(withdrawDto:WithdrawDto):Promise<BorrowInfo>{
        const{
            address,
            chainId,
            index,
            withdrawTime,
            borrowDebt,
            withdrawAmount,
            amountYetToWithdraw,
            noOfAbond
        } = withdrawDto;

        const found = await this.borrowRepository.findOne(
            {where:{
                address:address,
                chainId:chainId,
                index:index
            }});
        const borrower = await this.borrowerRepository.findOne({where:{address:address}});
        // const borrowDebtInEther = ethers.utils.formatEther(borrowDebt);
        const withdrawAmountInEther = ethers.utils.formatEther(withdrawAmount);
        const amountYetToWithdrawInEther = ethers.utils.formatEther(amountYetToWithdraw);
        const noOfAbondInEther = ethers.utils.formatEther(noOfAbond);

        if(!found.withdrawAmount1 && found.status != PositionStatus.LIQUIDATED){
            found.withdrawTime1 = withdrawTime;
            found.withdrawAmount1 = withdrawAmountInEther;
            found.noOfAbondMinted = parseFloat(noOfAbondInEther);
            found.amountYetToWithdraw = amountYetToWithdrawInEther;
            found.status = PositionStatus.WITHDREW1;
            if(chainId == 11155111){
                borrower.totalDepositedAmountInEthereum = parseFloat(borrower.totalDepositedAmountInEthereum.toString()) - parseFloat(found.depositedAmount);
                borrower.totalAmintInEthereum = parseFloat(borrower.totalAmintInEthereum.toString()) - parseFloat(found.noOfAmintMinted);
                borrower.totalAbondInEthereum = parseFloat(borrower.totalAbondInEthereum.toString()) +  parseFloat(noOfAbondInEther);
            }else if(chainId == 80001){
                borrower.totalDepositedAmountInPolygon =  parseFloat(borrower.totalDepositedAmountInPolygon.toString()) - parseFloat(found.depositedAmount);
                borrower.totalAmintInPolygon = parseFloat(borrower.totalAmintInPolygon.toString()) - parseFloat(found.noOfAmintMinted);
                borrower.totalAbondInPolygon = parseFloat(borrower.totalAbondInPolygon.toString()) +  parseFloat(noOfAbondInEther);
            }
        }else{
            found.withdrawTime2 = withdrawTime;  
            found.withdrawAmount2 = withdrawAmountInEther;
            if(chainId == 11155111){
                borrower.totalAbondInEthereum = parseFloat(borrower.totalAbondInEthereum.toString()) - parseFloat(noOfAbondInEther);
            }else if(chainId == 80001){
                borrower.totalAbondInPolygon = parseFloat(borrower.totalAbondInPolygon.toString()) - parseFloat(noOfAbondInEther);
            }
            found.amountYetToWithdraw = '0';
            found.status = PositionStatus.WITHDREW2;      
        }

        if(chainId == 80001){
            this.globalService.setTreasuryEthBalancePolygon(parseFloat(this.globalService.getTreasuryEthBalancePolygon.toString()) - parseFloat(withdrawAmountInEther)); 
        }else if(chainId == 11155111){
            this.globalService.setTreasuryEthBalanceEthereum(parseFloat(this.globalService.getTreasuryEthBalanceEthereum.toString()) - parseFloat(withdrawAmountInEther)); 
        }

        await this.borrowRepository.save(found);
        await this.borrowerRepository.save(borrower);

        return found;
    }

    @Cron("0 0 */3 * *")
    async createCriticalPositions():Promise<CriticalPositions[]>{
        const provider = await this.getSignerOrProvider(false);
        const borrowingContract = new ethers.Contract(borrowAddress,borrowABI,provider);
        const currentEthPrice = await borrowingContract.getUSDValue();
        const ethPrice = (currentEthPrice.toNumber())/100;
        const positions = await this.borrowRepository.findBy({
             criticalEthPrice:MoreThanOrEqual(ethPrice)
        });

        const criticalPositions = positions.map((position) =>{
            const criticalPosition = new CriticalPositions();
            criticalPosition.positionId = position.id
            criticalPosition.address = position.address
            criticalPosition.index = position.index
            criticalPosition.depositedEthAmount = position.depositedAmount
            criticalPosition.ethPriceAtDeposit = position.ethPrice
            criticalPosition.ethPriceAtLiquidation = position.liquidationEthPrice
            criticalPosition.criticalEthPrice = position.criticalEthPrice
            return criticalPosition;
        })

        const existingEntities = await this.criticalPositionsRepository.find();
        const liquidationPositions = criticalPositions.filter(criticalPosition => !existingEntities.some(existingEntity => existingEntity.positionId === criticalPosition.positionId));

        await this.criticalPositionsRepository.save(liquidationPositions);
        return liquidationPositions;
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async liquidate():Promise<CriticalPositions[]>{
        const provider = await this.getSignerOrProvider(true);
        const borrowingContract = new ethers.Contract(borrowAddress,borrowABI,provider);
        const currentEthPrice = await borrowingContract.getUSDValue();
        const ethPrice = currentEthPrice.toNumber()/100;
        const liquidationPositions = await this.criticalPositionsRepository.findBy({
            ethPriceAtLiquidation:MoreThanOrEqual(ethPrice)
        });
        if(liquidationPositions){
        let liquidatedPositions:BorrowInfo[];
        for(let i=0;i<liquidationPositions.length;i++){
            if(!liquidatedPositions){
                liquidatedPositions = [await this.borrowRepository.findOne({where:
                    {id:Equal(liquidationPositions[i].positionId)}})]
            }else{
                liquidatedPositions.push(await this.borrowRepository.findOne({where:
                    {id:Equal(liquidationPositions[i].positionId)}
                }));
            }
        }
        liquidatedPositions.map(async (liquidatedPosition) =>{
            await borrowingContract.liquidate(liquidatedPosition.address,liquidatedPosition.index,currentEthPrice);
            liquidatedPosition.status = PositionStatus.LIQUIDATED;
        });
        liquidatedPositions.map((liquidatedPosition) =>{liquidatedPosition.status = PositionStatus.LIQUIDATED})
        await this.criticalPositionsRepository.remove(liquidationPositions);
        await this.borrowRepository.save(liquidatedPositions);
    }
        return liquidationPositions;
    }

    async getSignerOrProvider(needSigner = false){
        const provider =  new ethers.providers.JsonRpcProvider("https://capable-stylish-general.matic-testnet.discover.quiknode.pro/25a44b3acd03554fa9450fe0a0744b1657132cb1/");
        // if(needSigner){
                //     const wallet = new ethers.Wallet('',provider);
                //     return wallet;
        // }
        return provider;
    };

}
