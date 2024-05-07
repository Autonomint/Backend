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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    BorrowsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-43-204-73-16.ap-south-1.compute.amazonaws.com',
      port: 5432,
      username: 'ubuntu',
      password: 'AutonomintPostgres@2023',
      database:'borrowing',
      autoLoadEntities:true,
      synchronize:true
    }),
    ScheduleModule.forRoot(),
    CdsModule,
    GlobalModule,
    ExternalProtocolsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
