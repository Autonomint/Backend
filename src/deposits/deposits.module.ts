import { Module } from '@nestjs/common';
import { DepositsController } from './deposits.controller';
import { DepositsService } from './deposits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deposit } from './deposit.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Deposit])],
  controllers: [DepositsController],
  providers: [DepositsService]
})
export class DepositsModule {}
