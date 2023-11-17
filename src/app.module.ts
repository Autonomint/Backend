import { Module } from '@nestjs/common';
import { BorrowsModule } from './borrows/borrows.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CdsModule } from './cds/cds.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
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
    CdsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
