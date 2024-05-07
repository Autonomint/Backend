/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowInfo } from './entities/borrow.entity';
import { BorrowerInfo } from './entities/borrower.entity';
import { CriticalPositions } from './entities/liquidation.entity';
import { GlobalModule } from '../global/global.module';
import { GlobalController } from '../global/global.controller';
import { GlobalVariables } from '../global/entities/global.entity';
import { LiquidationInfo } from './entities/liquidatedInfo.entity';
import { Batch } from './entities/batch.entity';
import { HighLTVPositions } from './entities/high-ltv-positions.entity';
import { Charts } from './entities/chart.entity';
import { AmintPrice } from './entities/amint-price.entity';
import { Days } from './entities/day.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      BorrowInfo,
      BorrowerInfo,
      CriticalPositions,
      GlobalVariables,
      LiquidationInfo,
      Batch,
      HighLTVPositions,
      Charts,
      AmintPrice,
      Days]),
    GlobalModule,
  ],
  controllers: [BorrowsController,GlobalController],
  providers: [BorrowsService]
})
export class BorrowsModule {}
