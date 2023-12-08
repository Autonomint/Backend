import { Module } from '@nestjs/common';
import { CdsController } from './cds.controller';
import { CdsService } from './cds.service';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalService } from 'src/global/global.service';
import { GlobalModule } from 'src/global/global.module';
import { GlobalController } from 'src/global/global.controller';

@Module({
  imports:[
    GlobalModule,
    TypeOrmModule.forFeature([CdsInfo,CdsDepositorInfo])],
  controllers: [CdsController],
  providers: [CdsService,GlobalService]
})
export class CdsModule {}
