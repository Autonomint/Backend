import { Body, Controller, Delete, Get, Header, Param, Patch, Post, Query} from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { PositionStatus } from './borrow-status.enum';
import { AddBorrowDto } from './dto/create-borrow.dto';
import { GetBorrowFilterDto } from './dto/get-borrow-filter.dto';
import { BorrowInfo } from './entities/borrow.entity';
import { BorrowerInfo } from './entities/borrower.entity';
import { WithdrawDto } from './dto/withdraw.dto';
import { GetBorrowDeposit } from './dto/get-borrow-deposit.dto';
import { CriticalPositions } from './entities/liquidation.entity';

@Controller('borrows')
export class BorrowsController {
    constructor(private borrowsService: BorrowsService) {}

    @Get('/deposit')
    getDepositsById(@Body() getBorrowDeposit:GetBorrowDeposit):Promise<BorrowInfo>{
        return this.borrowsService.getBorrowDeposit(getBorrowDeposit);
    }

    // @Get()
    // getDeposits(@Query() getBorrowFilterDto:GetBorrowFilterDto):Promise<BorrowInfo[]>{
    //     return this.borrowsService.getDeposits(getBorrowFilterDto);
    // }

    // @Get('/:id')
    // getDepositsById(@Param('id') id:string):Promise<BorrowInfo>{
    //     return this.borrowsService.getDepositsById(id);
    // }

    @Get('/index/:chainId/:address')
    getDepositorIndexByAddress(@Param() params:{address:string;chainId:number}):Promise<number>{
        const address = params.address;
        const chainId = params.chainId;
        return this.borrowsService.getDepositorIndexByAddress(address,chainId);
    }

    @Get('/:address')
    getDepositorByAddress(@Param('address') address:string):Promise<BorrowerInfo>{
        return this.borrowsService.getDepositorByAddress(address);
    }

    @Get('/:chainId/:address')
    getDepositsByChainId(@Param() params:{address:string;chainId:number}):Promise<BorrowInfo[]>{
        const address = params.address;
        const chainId = params.chainId;
        return this.borrowsService.getDepositsByChainId(address,chainId);
    }

    @Post('/borrowAmint')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    addBorrow(@Body() addBorrowDto:AddBorrowDto):Promise<BorrowInfo>{
        return this.borrowsService.addBorrow(addBorrowDto);
    }

    @Post('/criticalposition')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    addCriticalPositions(){
        return this.borrowsService.createCriticalPositions();
    }

    @Delete('/liquidate')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    liquidate(){
        return this.borrowsService.liquidate();
    }

    @Patch('/withdraw')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    withdraw(@Body() withdrawDto:WithdrawDto):Promise<BorrowInfo>{
        return this.borrowsService.withdraw(withdrawDto);
    }
}
