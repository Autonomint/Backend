import { Module } from '@nestjs/common';
import { DepositsModule } from './deposits/deposits.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DepositsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3456,
      username: '',
      password: '',
      database:'',
      autoLoadEntities:true,
      synchronize:true
    })],
})
export class AppModule {}
