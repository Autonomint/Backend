import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus } from './borrow-status.enum';
import { AddBorrowDto } from './dto/create-borrow.dto';
import { GetBorrowFilterDto } from './dto/get-borrow-filter.dto';
import { BorrowInfo } from './entities/borrow.entity';
import { Repository } from 'typeorm';
import { BorrowerInfo } from './entities/borrower.entity';
import { WithdrawDto } from './dto/withdraw.dto';

@Injectable()
export class BorrowsService {

    constructor(
        @InjectRepository(BorrowInfo)
        private borrowRepository: Repository<BorrowInfo>,
        @InjectRepository(BorrowerInfo)
        private borrowerRepository: Repository<BorrowerInfo>,
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

    async getDepositorByAddress(address:string):Promise<BorrowerInfo>{
        const found = await this.borrowerRepository.findOne({where:{address}});
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
            strikePrice
        } = addBorrowDto;

        const currentIndex = await this.getDepositorIndexByAddress(address);
        if(currentIndex == (index-1) || currentIndex == 0){
            const borrow = this.borrowRepository.create({
                address,
                index,
                collateralType,
                depositedAmount,
                depositedTime,
                ethPrice,
                noOfAmintMinted,
                strikePrice,
                status:PositionStatus.DEPOSITED
            });

            let borrower = await this.borrowerRepository.findOne({where:{address}});

            if(!borrower){
                borrower = new BorrowerInfo();
                borrower.totalDepositedAmount = parseInt(depositedAmount);
                borrower.totalAmint = parseInt(noOfAmintMinted);
            }else{
                borrower.totalDepositedAmount += parseInt(depositedAmount);
                borrower.totalAmint += parseInt(noOfAmintMinted);
            }
            borrower.address = address;
            borrower.totalIndex = index;
            borrower.totalAbond = 0;
            borrower.borrows = [borrow];

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
            borrower.totalDepositedAmount -= parseInt(found.depositedAmount);
            borrower.totalAmint -= parseInt(borrowDebt);
            borrower.totalAbond += parseInt(noOfAbond);
            found.noOfAbondMinted = parseInt(noOfAbond);
            found.amountYetToWithdraw = amountYetToWithdraw;
            found.status = PositionStatus.WITHDREW1;
        }else{
            found.withdrawTime2 = withdrawTime;  
            found.withdrawAmount2 = withdrawAmount;
            borrower.totalAbond -= parseInt(noOfAbond);
            found.amountYetToWithdraw = 0;
            found.status = PositionStatus.WITHDREW2;      
        }

        await this.borrowRepository.save(found);
        await this.borrowerRepository.save(borrower);

        return found;
    }
}
