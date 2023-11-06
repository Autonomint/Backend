import { Module } from '@nestjs/common';
import { DepositsModule } from './deposits/deposits.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DepositsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-43-204-73-16.ap-south-1.compute.amazonaws.com',
      port: 5432,
      username: '',
      password: '',
      database:'borrowing',
      autoLoadEntities:true,
      synchronize:true
    })],
})
export class AppModule {}
