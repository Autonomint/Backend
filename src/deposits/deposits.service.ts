import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus } from './deposit-status.enum';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { GetDepositFilterDto } from './dto/get-deposit-filter.dto';
import { Deposit } from './deposit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepositsService {

    constructor(
        @InjectRepository(Deposit)
        private depositsRepository: Repository<Deposit>
    ){}

    getDeposits(getDepositFilterDto:GetDepositFilterDto):Promise<Deposit[]>{
        const {
            address,
            collateralType,
            index,
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            status} = getDepositFilterDto;
        const query = this.depositsRepository.createQueryBuilder('deposit');

        if(address){
            query.andWhere('deposit.address = :address',{address});
        }
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

    async createDeposit(createDepositDto:CreateDepositDto):Promise<Deposit>{
        const{
            address,
            collateralType,
            index,
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice
        } = createDepositDto;

        const deposit = this.depositsRepository.create({
            address,
            collateralType,
            index,
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            status:PositionStatus.DEPOSITED
        });

        await this.depositsRepository.save(deposit);
        return deposit;
    }
}
