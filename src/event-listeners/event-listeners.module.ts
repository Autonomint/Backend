import { Module } from '@nestjs/common';
import { EventListeners } from './event-listeners';
import { BorrowsService } from '../borrows/borrows.service';
import { CdsService } from '../cds/cds.service';
import { PointsService } from '../points/points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowInfo } from '../borrows/entities/borrow.entity';
import { BorrowerInfo } from '../borrows/entities/borrower.entity';
import { CriticalPositions } from '../borrows/entities/liquidation.entity';
import { GlobalModule } from '../global/global.module';
import { GlobalVariables } from '../global/entities/global.entity';
import { LiquidationInfo } from '../borrows/entities/liquidatedInfo.entity';
import { Batch } from '../borrows/entities/batch.entity';
import { HighLTVPositions } from '../borrows/entities/high-ltv-positions.entity';
import { Charts } from '../borrows/entities/chart.entity';
import { AmintPrice } from '../borrows/entities/amint-price.entity';
import { Days } from '../borrows/entities/day.entity';
import { PointsModule } from '../points/points.module';
import { CdsInfo } from '../cds/entities/cds.entity';
import { CdsDepositorInfo } from '../cds/entities/cdsDepositor.entity';
import { Points } from '../points/entities/points.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            BorrowInfo,
            BorrowerInfo,
            CriticalPositions,
            GlobalVariables,
            LiquidationInfo,
            Batch,
            HighLTVPositions,
            Charts,
            AmintPrice,
            Days,
            CdsInfo, 
            CdsDepositorInfo,
            Points]),
            GlobalModule,
            PointsModule
    ],
    providers:[EventListeners,BorrowsService,CdsService,PointsService]
})
export class EventListenersModule {}
