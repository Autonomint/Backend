import { Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { GlobalVariables } from './entities/global.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([GlobalVariables])
  ],
  providers: [GlobalService,GlobalController],
  controllers: [GlobalController],
  exports: [GlobalService,GlobalController]
})
export class GlobalModule {}
