import { Global, Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { GlobalController } from './global.controller';

@Module({
  providers: [GlobalService],
  controllers: [GlobalController],
  exports: [GlobalService]
})
export class GlobalModule {}
