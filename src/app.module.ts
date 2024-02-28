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

@Module({
  imports: [
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
    ExternalProtocolsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
