import { Module } from '@nestjs/common';
import { CdsController } from './cds.controller';
import { CdsService } from './cds.service';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalService } from '../global/global.service';
import { GlobalModule } from '../global/global.module';
import { GlobalController } from '../global/global.controller';
import { GlobalVariables } from '../global/entities/global.entity';
import { LiquidationInfo } from '../borrows/entities/liquidatedInfo.entity';
import { Batch } from '../borrows/entities/batch.entity';

@Module({
  imports:[
    GlobalModule,
    TypeOrmModule.forFeature([CdsInfo, CdsDepositorInfo, GlobalVariables,LiquidationInfo,Batch]),
  ],
  controllers: [CdsController,GlobalController],
  providers: [CdsService, GlobalService],
})
export class CdsModule {}
