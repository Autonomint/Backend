import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus } from './deposit-status.enum';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { GetDepositFilterDto } from './dto/get-deposit-filter.dto';
import { Deposit } from './deposit.entity';
import { Repository } from 'typeorm';
import { Depositor } from './depositor.entity';

@Injectable()
export class DepositsService {

    constructor(
        @InjectRepository(Deposit)
        private depositsRepository: Repository<Deposit>,
        @InjectRepository(Depositor)
        private depositorRepository: Repository<Depositor>,
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

    async getDepositsById(id:string):Promise<Deposit>{
        const found = await this.depositsRepository.findOne({where:{id:id}});
        if(!found){
            throw new NotFoundException(`Deposit with ID "${id}" not found`);
        }else{
            return found;
        }
    }

    async getDepositorByAddress(address:string):Promise<Depositor>{
        const found = await this.depositorRepository.findOne({where:{address}});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" not found`);
        }else{
            return found;
        }
    }

    async getDepositorIndexByAddress(address:string):Promise<number>{
        const found = await this.depositorRepository.findOne({where:{address}});
        if(!found){
            return 1;
        }else{
            return found.totalIndex;
        }
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

        const currentIndex = await this.getDepositorIndexByAddress(address);
        if(currentIndex == (index-1) || currentIndex == 1){
            const deposit = this.depositsRepository.create({
                index,
                collateralType,
                depositedAmount,
                depositedTime,
                ethPrice,
                noOfAmintMinted,
                strikePrice,
                status:PositionStatus.DEPOSITED
            });

            let depositor = await this.depositorRepository.findOne({where:{address}});

            if(!depositor){
                depositor = new Depositor();
                depositor.totalDepositedAmount = depositedAmount;
                depositor.totalAmint = noOfAmintMinted;
                (depositor.deposits) = [deposit];
            }else{
                depositor.totalDepositedAmount += depositedAmount;
                depositor.totalAmint == noOfAmintMinted;
                (depositor.deposits).push(deposit);
            }
            depositor.address = address;
            depositor.totalIndex = index;
            depositor.totalAbond = 0;

            console.log(depositor);
            
        
            await this.depositsRepository.save(deposit);
            await this.depositorRepository.save(depositor);
            return deposit;
        }else{
            return ;
        }


    }
}
