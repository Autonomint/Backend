import { Module } from '@nestjs/common';
import { BorrowsModule } from './borrows/borrows.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CdsModule } from './cds/cds.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalService } from './global/global.service';
import { GlobalModule } from './global/global.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ExternalProtocolsModule } from './external-protocols/external-protocols.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { EventListenersModule } from './event-listeners/event-listeners.module';
import { PointsModule } from './points/points.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    BorrowsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-3-7-222-91.ap-south-1.compute.amazonaws.com',
      port: 5432,
      username: 'ubuntu',
      password: 'AutonomintPostgres@2023',
      database:'borrowing_dev',
      autoLoadEntities:true,
      synchronize:true
    }),
    ScheduleModule.forRoot(),
    CdsModule,
    GlobalModule,
    ExternalProtocolsModule,
    AuthModule,
    EventListenersModule,
    PointsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
