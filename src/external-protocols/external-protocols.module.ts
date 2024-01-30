import { Module } from '@nestjs/common';
import { ExternalProtocolsController } from './external-protocols.controller';
import { ExternalProtocolsService } from './external-protocols.service';
import { GlobalModule } from '../global/global.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalProtocolDepositData } from './entities/external-protocol.entity';
import { TotalExternalProtocolDepositData } from './entities/total-external-protocol-entity';
import { GlobalVariables } from '../global/entities/global.entity';

@Module({
  imports:[
    GlobalModule,
    TypeOrmModule.forFeature([ExternalProtocolDepositData,TotalExternalProtocolDepositData,GlobalVariables])
  ],
  controllers: [ExternalProtocolsController],
  providers:[ExternalProtocolsService]
})
export class ExternalProtocolsModule {}
