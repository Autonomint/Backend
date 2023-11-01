import { Repository,EntityRepository } from 'typeorm';
import { Deposit } from "./deposit.entity";
import { CreateDepositDto } from './dto/create-deposit.dto';
import { PositionStatus } from './deposit-status.enum';
import { GetDepositFilterDto } from './dto/get-deposit-filter.dto';

@EntityRepository(DepositsRepository)
export class DepositsRepository extends Repository<Deposit>{
    
    async getDeposits(getDepositFilterDto:GetDepositFilterDto):Promise<Deposit[]>{
        const {
            address,
            collateralType,
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            status} = getDepositFilterDto;
        const query = this.createQueryBuilder('deposit');

        if(address){
            query.andWhere('deposit.address = :address',{address});
        }
        if(collateralType){
            query.andWhere('deposit.collateralType = :collateralType',{collateralType});
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
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
        } = createDepositDto;

        const deposit = this.create({
            address,
            collateralType,
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            status:PositionStatus.DEPOSITED
        });

        await this.save(deposit);
        return deposit;
    }
}