import { Module } from '@nestjs/common';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowInfo } from './entities/borrow.entity';
import { BorrowerInfo } from './entities/borrower.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([BorrowInfo,BorrowerInfo])
  ],
  controllers: [BorrowsController],
  providers: [BorrowsService]
})
export class BorrowsModule {}
