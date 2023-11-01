import { Controller, Get, Post, Query} from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { PositionStatus } from './deposit-status.enum';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { GetDepositFilterDto } from './dto/get-deposit-filter.dto';
import { Deposit } from './deposit.entity';

@Controller('deposits')
export class DepositsController {
    constructor(private depositsService: DepositsService) {}

    @Get()
    getDeposits(@Query() getDepositFilterDto:GetDepositFilterDto):Promise<Deposit[]>{
        return this.depositsService.getDeposits(getDepositFilterDto);
    }

    @Post()
    createDeposit(createDepositDto:CreateDepositDto):Promise<Deposit>{
        return this.depositsService.createDeposit(createDepositDto);
    }
}
