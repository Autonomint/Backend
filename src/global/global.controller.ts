import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GlobalService } from './global.service';

@Controller('global')
export class GlobalController {
    constructor(private globalService:GlobalService){}

    @Get('/amintBalance/:chainId')
    getAmintBalance(@Param('chainId') chainId:number){
        return this.globalService.getTreasuryAmintBalance(chainId);
    }

    @Get('/ethBalance/:chainId')
    getEthBalance(@Param('chainId') chainId:number){
        return this.globalService.getTreasuryEthBalance(chainId);
    }

    @Get('/liquidationIndex/:chainId')
    getLiquidationIndex(@Param('chainId') chainId:number){
        return this.globalService.getLiquidationIndex(chainId);
    }

    @Get('/availableLiquidationAmount/:chainId')
    getAvailableLiquidationAmount(@Param('chainId') chainId:number){
        return this.globalService.getTotalAvailableLiquidationAmount(chainId);
    }

    @Post('/setAmintBalance')
    setAmintBalance(@Body() chainId:number,amintBalance:number){
        return this.globalService.setTreasuryAmintBalance(chainId,amintBalance);
    }

    @Post('/setEthBalance')
    setEthBalance(@Body() chainId:number,ethBalance:number){
        return this.globalService.setTreasuryEthBalance(chainId,ethBalance);
    }

    @Post('/setLiquidationIndex')
    setLiquidationIndex(@Body() chainId:number,liquidationIndex:number){
        return this.globalService.setLiquidationIndex(chainId,liquidationIndex);
    }

    @Post('/setAvailableLiquidationAmount')
    setAvailableLiquidationAmount(@Body() chainId:number,liquidationAmount:number){
        return this.globalService.setTotalAvailableLiquidationAmount(chainId,liquidationAmount);
    }
}
