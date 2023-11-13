import { Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { CdsService } from './cds.service';
import { GetCdsFilterDto } from './dto/get-cds-filter.dto';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { AddCdsDto } from './dto/create-cds.dto';
import { WithdrawCdsDto } from './dto/withdraw-cds.dto';
import { GetCdsDeposit } from './dto/get-cds-deposit.dto';

@Controller('cds')
export class CdsController {
    constructor(private cdsService:CdsService){}

    @Get()
    getDepositsById(@Body() getCdsDeposit:GetCdsDeposit):Promise<CdsInfo>{
        return this.cdsService.getCdsDeposit(getCdsDeposit);
    }

    // @Get('/:address')
    // getDepositorIndexByAddress(@Param('address') address:string):Promise<number>{
    //         return this.cdsService.getCdsDepositorIndexByAddress(address);
    // }

    @Get('/:address')
    getDepositorByAddress(@Param('address') address:string):Promise<CdsDepositorInfo>{
        return this.cdsService.getCdsDepositorByAddress(address);
    }

    @Post()
    addBorrow(@Body() addCdsDto:AddCdsDto):Promise<CdsInfo>{
        return this.cdsService.addCds(addCdsDto);
    }

    @Patch()
    withdraw(@Body() withdrawCdsDto:WithdrawCdsDto):Promise<CdsInfo>{
        return this.cdsService.cdsWithdraw(withdrawCdsDto);
    }
}
