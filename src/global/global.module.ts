import { Global, Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';
import { GlobalVariables } from './entities/global.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([GlobalVariables])
  ],
  providers: [GlobalService],
  controllers: [GlobalController],
  exports: [GlobalService]
})
export class GlobalModule {}
