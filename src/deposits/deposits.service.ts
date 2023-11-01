import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus } from './deposit-status.enum';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { GetDepositFilterDto } from './dto/get-deposit-filter.dto';
import { Deposit } from './deposit.entity';
import { DepositsRepository } from './deposits.repository';

@Injectable()
export class DepositsService {

    constructor(
        @InjectRepository(DepositsRepository)
        private depositsRepository:DepositsRepository
    ){}

    getDeposits(getDepositFilterDto:GetDepositFilterDto):Promise<Deposit[]>{
        return this.depositsRepository.getDeposits(getDepositFilterDto);
    }

    createDeposit(createDepositDto:CreateDepositDto):Promise<Deposit>{
        return this.depositsRepository.createDeposit(createDepositDto);
    }
}
