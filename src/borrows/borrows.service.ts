import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus } from './borrow-status.enum';
import { AddBorrowDto } from './dto/create-borrow.dto';
import { GetBorrowFilterDto } from './dto/get-borrow-filter.dto';
import { BorrowInfo } from './entities/borrow.entity';
import { Repository,Equal,Not,MoreThanOrEqual } from 'typeorm';
import { ethers } from 'ethers';
import { BorrowerInfo } from './entities/borrower.entity';
import { WithdrawDto } from './dto/withdraw.dto';
import { GetBorrowDeposit } from './dto/get-borrow-deposit.dto';
import { CriticalPositions } from './entities/liquidation.entity';
import { bybit } from 'ccxt';

import {
    borrowAddressSepolia,borrowABISepolia,
    cdsAddressSepolia,cdsABISepolia,
    treasuryAddressSepolia,treasuryABISepolia,
    optionsAddressSepolia,optionsABISepolia,
    borrowAddressMumbai,borrowABIMumbai,
    cdsAddressMumbai,cdsABIMumbai,
    treasuryAddressMumbai,treasuryABIMumbai,
    optionsAddressMumbai,optionsABIMumbai
} from '../utils/index';
import { GetBorrowDepositByChainId } from './dto/get-borrow-deposit-by-chainid.dto';
import { Cron,CronExpression } from '@nestjs/schedule';
import { GlobalService } from '../global/global.service';
import { LiquidationInfo } from './entities/liquidatedInfo.entity';
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
        @InjectRepository(LiquidationInfo)
        private liquidationInfoRepository: Repository<LiquidationInfo>,
        @Inject(GlobalService)
        private globalService:GlobalService,
    ){}
    private exchange = new bybit({
        apiKey: 'BNi0E7lvKWezOwjV0N',
        secret: 'ER4G9Vm1z01Xzr31HbzofYLlU9m7ISue1ixo',
    });

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

    async getDepositorByAddress(address:string,chainId:number):Promise<BorrowerInfo>{
        const found = await this.borrowerRepository.findOne({where:{
            chainId,address}});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" not found`);
        }else{
            return found;
        }
    }

    async getDepositorIndexByAddress(address:string,chainId:number):Promise<number>{
        const found = await this.borrowerRepository.findOne({where:{
            chainId:chainId,
            address:address}});
        if(!found){
            return 0;
        }else{
            return found.totalIndex;
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
            strikePricePercent,
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

            let borrower = await this.borrowerRepository.findOne({where:{
                chainId:chainId,
                address:address}});

            if(!borrower){
                borrower = new BorrowerInfo();
                borrower.chainId = chainId;
                borrower.totalDepositedAmount = parseFloat(depositedAmount);
                borrower.totalAmint = parseFloat(noOfAmintMinted);
                borrower.totalAbond = 0;
                borrower.totalIndex = index;
                borrower.borrows = [borrow];
            }else{
                borrower.totalDepositedAmount = parseFloat(borrower.totalDepositedAmount.toString()) + parseFloat(depositedAmount);
                borrower.totalAmint = parseFloat(borrower.totalAmint.toString()) +  parseFloat(noOfAmintMinted);
                borrower.totalAbond = 0;
                borrower.totalIndex = index;
                borrower.borrows.push(borrow);
            }
            borrower.address = address;

            const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);

            if(ethBalance == 0){
                this.globalService.setTreasuryEthBalance(chainId,parseFloat(depositedAmount)); 
            }else{
                this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) + parseFloat(depositedAmount)); 
            }

            await this.borrowRepository.save(borrow);
            await this.borrowerRepository.save(borrower);
            return borrow;
        }else{
            throw new NotFoundException('Incorrect index') ;
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
            noOfAbond,
            totalDebtAmount
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
            found.totalDebtAmount = totalDebtAmount;
            found.status = PositionStatus.WITHDREW1;
            borrower.totalDepositedAmount = parseFloat(borrower.totalDepositedAmount.toString()) - parseFloat(found.depositedAmount);
            borrower.totalAmint = parseFloat(borrower.totalAmint.toString()) - parseFloat(found.noOfAmintMinted);
            borrower.totalAbond = parseFloat(borrower.totalAbond.toString()) +  parseFloat(noOfAbondInEther);

        }else{
            found.withdrawTime2 = withdrawTime;  
            found.withdrawAmount2 = withdrawAmountInEther;
            borrower.totalAbond = parseFloat(borrower.totalAbond.toString()) - parseFloat(noOfAbondInEther);
            found.amountYetToWithdraw = '0';
            found.status = PositionStatus.WITHDREW2;      
        }

        const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);

        this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) - parseFloat(withdrawAmountInEther));

        await this.borrowRepository.save(found);
        await this.borrowerRepository.save(borrower);

        return found;
    }

    @Cron("0 0 */3 * *")
    async createCriticalPositions():Promise<CriticalPositions[]>{
        const provider = await this.getSignerOrProvider(80001,false);
        const borrowingContract = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,provider);
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
        const signerMumbai = await this.getSignerOrProvider(80001,true);
        const borrowingContractMumbai = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signerMumbai);
        const signerSepolia = await this.getSignerOrProvider(11155111,true);
        const borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signerSepolia);
        let borrowingContract;
        const currentEthPrice = await borrowingContractMumbai.getUSDValue();
        const ethPrice = currentEthPrice.toNumber()/100;
        const liquidationPositions = await this.criticalPositionsRepository.findBy({
            ethPriceAtLiquidation:MoreThanOrEqual(ethPrice)
        });
        if(liquidationPositions.length != 0){
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
            if(liquidatedPosition.chainId == 80001){
                borrowingContract = borrowingContractMumbai;
            }else if(liquidatedPosition.chainId == 11155111){
                borrowingContract = borrowingContractSepolia
            }
            await borrowingContract.liquidate(liquidatedPosition.address,liquidatedPosition.index,currentEthPrice);
            liquidatedPosition.status = PositionStatus.LIQUIDATED;
            const chainId = liquidatedPosition.chainId;      
            borrowingContract.on('Liquidate',async (index,liquidationAmount,profits,ethAmount,availableLiquidationAmount) => {
                const liquidationInfo = this.liquidationInfoRepository.create({
                    chainId:chainId,
                    index,
                    liquidationAmount,
                    profits,
                    ethAmount,
                    availableLiquidationAmount,
                })
                await this.liquidationInfoRepository.save(liquidationInfo);
                await this.globalService.setLiquidationIndex(chainId,index);
                const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);
                await this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) - parseFloat(liquidationAmount))
                await this.globalService.setTotalAvailableLiquidationAmount(chainId,availableLiquidationAmount);
            })
        });
        await this.criticalPositionsRepository.remove(liquidationPositions);
        await this.borrowRepository.save(liquidatedPositions);
    }
        return liquidationPositions;
    }

    async getSignerOrProvider(chainId:number,needSigner = false){
        let rpcUrl:string;
        let pKey:string;
        if(chainId == 11155111){
            rpcUrl = "https://sepolia.infura.io/v3/e9cf275f1ddc4b81aa62c5aa0b11ac0f"
            pKey = 'ec619e44ab8377982c53722fbb1a39549c8e927f440f769e5c74313fb7e7eb3f'
        }else if(chainId == 80001){
            rpcUrl = "https://capable-stylish-general.matic-testnet.discover.quiknode.pro/25a44b3acd03554fa9450fe0a0744b1657132cb1/"
            pKey = '3cdf792b14656fcdcc415ba2fde3c7fbadacdcc887778f36e8ce98db34021e15';
        }
        const provider =  new ethers.providers.JsonRpcProvider(rpcUrl);
        if(needSigner){
                const wallet = new ethers.Wallet(pKey,provider);
                return wallet;
        }
        return provider;
    };

    async getEthVolatility(chainId:number,amount:string):Promise<[number,number]>{
        const abc = await this.exchange.fetchVolatilityHistory('ETH',{period:30});
        const volatility = abc.map(item => item.info[0].value)[0];
        const signer = await this.getSignerOrProvider(chainId,true);
        const optionsContractSepolia = new ethers.Contract(optionsAddressSepolia,optionsABISepolia,signer);
        const optionsContractMumbai = new ethers.Contract(optionsAddressMumbai,optionsABIMumbai,signer);
        let optionFees;
        if(chainId == 80001){
            optionFees = await optionsContractMumbai.calculateOptionPrice(volatility,parseInt(amount));
        }else if(chainId == 11155111){
            optionFees = await optionsContractSepolia.calculateOptionPrice(volatility,parseInt(amount));
        }
        return[(volatility * 1e8),optionFees];
    }

}
