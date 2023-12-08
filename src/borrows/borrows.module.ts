import { Module } from '@nestjs/common';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowInfo } from './entities/borrow.entity';
import { BorrowerInfo } from './entities/borrower.entity';
import { CriticalPositions } from './entities/liquidation.entity';
import { GlobalService } from 'src/global/global.service';
import { GlobalModule } from 'src/global/global.module';
import { GlobalController } from 'src/global/global.controller';

@Module({
  imports:[
    GlobalModule,
    TypeOrmModule.forFeature([BorrowInfo,BorrowerInfo,CriticalPositions])
  ],
  controllers: [BorrowsController],
  providers: [BorrowsService,GlobalService]
})
export class BorrowsModule {}
