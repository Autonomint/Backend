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
    borrowABI,cdsABI,treasuryABI
} from '../utils/index';
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
        const{address,index} = getBorrowDeposit;
        const found = await this.borrowRepository.findOne(
            {where:{
                address:address,
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

    async getDepositorIndexByAddress(address:string):Promise<number>{
        const found = await this.borrowerRepository.findOne({where:{address}});
        if(!found){
            return 0;
        }else{
            return found.totalIndex;
        }
    }

    async addBorrow(addBorrowDto:AddBorrowDto):Promise<BorrowInfo>{
        const{
            address,
            collateralType,
            index,
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePricePercent
        } = addBorrowDto;

        const currentIndex = await this.getDepositorIndexByAddress(address);
        const strikePrice = (ethPrice * (1 + strikePricePercent/100));
        if(currentIndex == (index-1) || currentIndex == 0){
            const liquidationEthPrice = (ethPrice*80)/100;
            const criticalEthPrice = (ethPrice*83)/100;;
            const borrow = this.borrowRepository.create({
                address,
                index,
                collateralType,
                depositedAmount,
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
                borrower.totalDepositedAmount = BigInt(parseInt(depositedAmount));
                borrower.totalAmint = BigInt(parseInt(noOfAmintMinted));
                borrower.borrows = [borrow];
            }else{
                borrower.totalDepositedAmount = BigInt(parseInt(borrower.totalDepositedAmount.toString())) + BigInt(parseInt(depositedAmount));
                borrower.totalAmint = BigInt(parseInt(borrower.totalAmint.toString())) + BigInt(parseInt(noOfAmintMinted));
            }
            borrower.address = address;
            borrower.totalIndex = index;
            borrower.totalAbond = BigInt(0);
            borrower.borrows.push(borrow);

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
                index:index
            }});
        const borrower = await this.borrowerRepository.findOne({where:{address:address}});

        if(!found.withdrawAmount1){
            found.withdrawTime1 = withdrawTime;
            found.withdrawAmount1 = withdrawAmount;
            borrower.totalDepositedAmount = BigInt(parseInt(borrower.totalDepositedAmount.toString())) - BigInt(parseInt(found.depositedAmount));
            borrower.totalAmint = BigInt(parseInt(borrower.totalAmint.toString())) - BigInt(parseInt(borrowDebt));
            borrower.totalAbond = BigInt(parseInt(borrower.totalAbond.toString())) + BigInt(parseInt(noOfAbond));
            found.noOfAbondMinted = BigInt(parseInt(noOfAbond));
            found.amountYetToWithdraw = amountYetToWithdraw;
            found.status = PositionStatus.WITHDREW1;
        }else{
            found.withdrawTime2 = withdrawTime;  
            found.withdrawAmount2 = withdrawAmount;
            borrower.totalAbond = BigInt(parseInt(borrower.totalAbond.toString())) - BigInt(parseInt(noOfAbond));
            found.amountYetToWithdraw = BigInt(0);
            found.status = PositionStatus.WITHDREW2;      
        }

        await this.borrowRepository.save(found);
        await this.borrowerRepository.save(borrower);

        return found;
    }

    async createCriticalPositions():Promise<CriticalPositions[]>{
        const provider = await this.getSignerOrProvider(false);
        const borrowingContract = new ethers.Contract(borrowAddress,borrowABI,provider);
        const currentEthPrice = await borrowingContract.getUSDValue();
        const ethPrice = currentEthPrice.toNumber();
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

    async liquidate():Promise<CriticalPositions[]>{
        const currentEthPrice = 1600;
        const liquidationPositions = await this.criticalPositionsRepository.findBy({
            ethPriceAtLiquidation:MoreThanOrEqual(currentEthPrice)
        });
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
        liquidatedPositions.map((liquidatedPosition) =>{liquidatedPosition.status = PositionStatus.LIQUIDATED})
        await this.criticalPositionsRepository.remove(liquidationPositions);
        await this.borrowRepository.save(liquidatedPositions);
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
