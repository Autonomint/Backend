import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GlobalService } from './global.service';

@Controller('global')
export class GlobalController {
    constructor(private globalService:GlobalService){}

    // Get the amint balance
    @Get('/amintBalance/:chainId')
    getAmintBalance(@Param('chainId') chainId:number):Promise<number>{
        return this.globalService.getTreasuryAmintBalance(chainId);
    }

    // Get the eth balance
    @Get('/ethBalance/:chainId')
    getEthBalance(@Param('chainId') chainId:number):Promise<number>{
        return this.globalService.getTreasuryEthBalance(chainId);
    }
    // Get the liquidation index
    @Get('/liquidationIndex/:chainId')
    getLiquidationIndex(@Param('chainId') chainId:number):Promise<number>{
        return this.globalService.getLiquidationIndex(chainId);
    }
    // Get the available liquidation amount
    @Get('/availableLiquidationAmount/:chainId')
    getAvailableLiquidationAmount(@Param('chainId') chainId:number):Promise<number>{
        return this.globalService.getTotalAvailableLiquidationAmount(chainId);
    }
    // Set the amint balance
    @Post('/setAmintBalance')
    setAmintBalance(@Body() chainId:number,amintBalance:number){
        return this.globalService.setTreasuryAmintBalance(chainId,amintBalance);
    }
    // Set the eth balance
    @Post('/setEthBalance')
    setEthBalance(@Body() chainId:number,ethBalance:number){
        return this.globalService.setTreasuryEthBalance(chainId,ethBalance);
    }
    // Set the liquidation index
    @Post('/setLiquidationIndex')
    setLiquidationIndex(@Body() chainId:number,liquidationIndex:number){
        return this.globalService.setLiquidationIndex(chainId,liquidationIndex);
    }
    // Set the available liquidation amount
    @Post('/setAvailableLiquidationAmount')
    setAvailableLiquidationAmount(@Body() chainId:number,liquidationAmount:number){
        return this.globalService.setTotalAvailableLiquidationAmount(chainId,liquidationAmount);
    }
}
