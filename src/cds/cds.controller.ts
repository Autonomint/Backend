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

    //To get the deposits by id
    @Get('/deposit')
    getDepositsById(@Body() getCdsDeposit:GetCdsDeposit):Promise<CdsInfo>{
        return this.cdsService.getCdsDeposit(getCdsDeposit);
    }

    // To get the totalIndex of the depositor by address
    @Get('/index/:chainId/:address')
    getDepositorIndexByAddress(@Param() params:{address:string;chainId:number}):Promise<number>{
        const address = params.address;
        const chainId = params.chainId;
        return this.cdsService.getCdsDepositorIndexByAddress(address,chainId);
    }

    // To get the depositor's total deposits details
    @Get('/totalDeposits/:chainId/:address')
    getDepositorByAddress(@Param() params:{address:string;chainId:number}):Promise<CdsDepositorInfo>{
        const address = params.address;
        const chainId = params.chainId;
        return this.cdsService.getCdsDepositorByAddress(address,chainId);
    }

   
    // To get the withdraw amount of the cds depositor
    @Post('/withdraw/calculateWithdrawAmount')
    getWithdrawAmount(@Body() cdsAmountToReturn:CdsAmountToReturn):Promise<number[]>{
        return this.cdsService.calculateWithdrawAmount(cdsAmountToReturn);
    }

    // To add the deposit in borrowing
    @Post('/depositAmint')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    addBorrow(@Body() addCdsDto:AddCdsDto):Promise<CdsInfo>{
        return this.cdsService.addCds(addCdsDto);
    }

    // To withdraw the positions
    @Patch('/withdraw')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    withdraw(@Body() withdrawCdsDto:WithdrawCdsDto):Promise<CdsInfo>{
        return this.cdsService.cdsWithdraw(withdrawCdsDto);
    }

    // To get the deposits in that particular chain Eg:Ethereum,Polygon
    @Get('/:chainId/:address')
    getDepositsByChainId(@Param() params:{address:string;chainId:number}):Promise<CdsInfo[]>{
        const address = params.address;
        const chainId = params.chainId;
        return this.cdsService.getDepositsByChainId(address,chainId);
    }
}
