import { Module } from '@nestjs/common';
import { CdsController } from './cds.controller';
import { CdsService } from './cds.service';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([CdsInfo,CdsDepositorInfo])],
  controllers: [CdsController],
  providers: [CdsService]
})
export class CdsModule {}
