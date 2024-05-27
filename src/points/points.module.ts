import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Points } from './entities/points.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Points])
  ],
  controllers: [PointsController],
  providers: [PointsService],
  exports: [PointsService]
})
export class PointsModule {}
