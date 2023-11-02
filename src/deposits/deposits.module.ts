import { Module } from '@nestjs/common';
import { DepositsController } from './deposits.controller';
import { DepositsService } from './deposits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositsRepository } from './deposits.repository';

@Module({
  imports:[TypeOrmModule.forFeature([DepositsRepository])],
  controllers: [DepositsController],
  providers: [DepositsService]
})
export class DepositsModule {}
