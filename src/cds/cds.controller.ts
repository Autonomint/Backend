/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param,Header, Patch, Post, Query} from '@nestjs/common';
import { CdsService } from './cds.service';
import { GetCdsFilterDto } from './dto/get-cds-filter.dto';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { AddCdsDto } from './dto/create-cds.dto';
import { WithdrawCdsDto } from './dto/withdraw-cds.dto';
import { GetCdsDeposit } from './dto/get-cds-deposit.dto';
import { CdsAmountToReturn } from './dto/cdsAmountToReturn.dto';

@Controller('cds')
export class CdsController {
    constructor(private cdsService:CdsService){}

    @Get('/deposit')
    getDepositsById(@Body() getCdsDeposit:GetCdsDeposit):Promise<CdsInfo>{
        return this.cdsService.getCdsDeposit(getCdsDeposit);
    }

    @Get('/index/:chainId/:address')
    getDepositorIndexByAddress(@Param() params:{address:string;chainId:number}):Promise<number>{
        const address = params.address;
        const chainId = params.chainId;
        return this.cdsService.getCdsDepositorIndexByAddress(address,chainId);
    }

    @Get('/:address')
    getDepositorByAddress(@Param('address') address:string):Promise<CdsDepositorInfo>{
        return this.cdsService.getCdsDepositorByAddress(address);
    }

   

    @Get('/withdraw/calculateWithdrawAmount')
    getWithdrawAmount(@Body() cdsAmountToReturn:CdsAmountToReturn):Promise<number[]>{
        return this.cdsService.calculateWithdrawAmount(cdsAmountToReturn);
    }

    @Post('/depositAmint')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    addBorrow(@Body() addCdsDto:AddCdsDto):Promise<CdsInfo>{
        return this.cdsService.addCds(addCdsDto);
    }

    @Patch('/withdraw')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    withdraw(@Body() withdrawCdsDto:WithdrawCdsDto):Promise<CdsInfo>{
        return this.cdsService.cdsWithdraw(withdrawCdsDto);
    }

    @Get('/:chainId/:address')
    getDepositsByChainId(@Param() params:{address:string;chainId:number}):Promise<CdsInfo[]>{
        const address = params.address;
        const chainId = params.chainId;
        return this.cdsService.getDepositsByChainId(address,chainId);
    }
}
