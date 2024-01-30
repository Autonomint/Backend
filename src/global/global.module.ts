import { Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { GlobalVariables } from './entities/global.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from '../borrows/entities/batch.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([GlobalVariables,Batch])
  ],
  providers: [GlobalService,GlobalController],
  controllers: [GlobalController],
  exports: [GlobalService,GlobalController]
})
export class GlobalModule {}
