import { Module } from '@nestjs/common';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowInfo } from './entities/borrow.entity';
import { BorrowerInfo } from './entities/borrower.entity';
import { CriticalPositions } from './entities/liquidation.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BorrowInfo,BorrowerInfo,CriticalPositions])
  ],
  controllers: [BorrowsController],
  providers: [BorrowsService]
})
export class BorrowsModule {}
