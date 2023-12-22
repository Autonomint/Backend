import { Controller, Get, Post, Body, Param, Patch, Header } from '@nestjs/common';
import { ExternalProtocolsService } from './external-protocols.service';
import { ExternalProtocolDepositData } from './entities/external-protocol.entity';
import { GetExternalProtocolDepositDto } from './dto/get-external-protocol-deposit.dto';
import { AddDepositDto } from './dto/create-deposit.dto';
import { WithdrawExternalProtocolDto } from './dto/withdraw.dto';
import { TotalExternalProtocolDepositData } from './entities/total-external-protocol-entity';

@Controller('external-protocols')
export class ExternalProtocolsController {
    constructor (private externalProtocolsService:ExternalProtocolsService){}

    @Get('/deposit')
    getExternalProtocolDeposit(@Body() getExternalProtocolDepositDto:GetExternalProtocolDepositDto):Promise<ExternalProtocolDepositData>{
        return this.externalProtocolsService.getExternalProtocolDeposit(getExternalProtocolDepositDto);
    }

    @Get('totalDeposits/:chainId/:protocolName')
    getTotalDepositsByChainId(@Param() params:{protocolName:string;chainId:number}):Promise<TotalExternalProtocolDepositData>{
        const protocolName = params.protocolName;
        const chainId = params.chainId;
        return this.externalProtocolsService.getTotalDepositsByChainId(protocolName,chainId);
    }


    @Post('/depositEthInProtocol')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    addDeposit(@Body() addDepositDto:AddDepositDto):Promise<ExternalProtocolDepositData>{
        return this.externalProtocolsService.addDeposit(addDepositDto);
    }

    @Patch('/withdrawEthFromProtocol')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    externalProtocolWithdraw(@Body() withdrawExternalProtocolCdsDto:WithdrawExternalProtocolDto):Promise<ExternalProtocolDepositData>{
        return this.externalProtocolsService.externalProtocolWithdraw(withdrawExternalProtocolCdsDto);
    }

    @Get('/:chainId/:protocolName')
    getDepositsByChainId(@Param() params:{protocolName:string;chainId:number}):Promise<ExternalProtocolDepositData[]>{
        const protocolName = params.protocolName;
        const chainId = params.chainId;
        return this.externalProtocolsService.getDepositsByChainId(protocolName,chainId);
    }
    
}
