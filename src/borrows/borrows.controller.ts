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
import { AllTime } from './allTime-fetch.enum';

@Controller('borrows')
export class BorrowsController {
    constructor(private borrowsService: BorrowsService) {}

    //To get the deposits by id
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

    // To get the totalIndex of the depositor by address
    @Get('/index/:chainId/:address')
    getDepositorIndexByAddress(@Param() params:{address:string;chainId:number}):Promise<number>{
        const address = params.address;
        const chainId = params.chainId;
        return this.borrowsService.getDepositorIndexByAddress(address,chainId);
    }

    // To get the depositor's total deposits details
    @Get('/totalDeposits/:chainId/:address')
    getDepositorByAddress(@Param() params:{address:string;chainId:number}):Promise<BorrowerInfo>{
        const address = params.address;
        const chainId = params.chainId;
        return this.borrowsService.getDepositorByAddress(address,chainId);
    }

    // To get the deposits in that particular chain Eg:Ethereum,Polygon
    @Get('/:chainId/:address')
    getDepositsByChainId(@Param() params:{address:string;chainId:number}):Promise<BorrowInfo[]>{
        const address = params.address;
        const chainId = params.chainId;
        return this.borrowsService.getDepositsByChainId(address,chainId);
    }

    @Get('/optionFees/:chainId/:amount/:ethPrice/:percent')
    getEthVolatility(@Param() params:{chainId:number;amount:string;ethPrice:number;percent:number}):Promise<[number,number]>{
        const chainId = params.chainId;
        const amount = params.amount;
        const ethPrice = params.ethPrice;
        const strikePricePercent = params.percent
        return this.borrowsService.getEthVolatility(chainId,amount,ethPrice,strikePricePercent);
    }

    @Get('/ratio/:chainId/:ethPrice')
    getRatio(@Param() params:{chainId:number;ethPrice:number;}):Promise<number>{
        const chainId = params.chainId;
        const ethPrice = params.ethPrice;
        return this.borrowsService.getRatio(chainId,ethPrice);
    }

    @Get('/chart/optionFees/:chainId/:days/:allTime')
    getOptionFeesHistory(@Param() params:{chainId:number;days:number;allTime:AllTime}):Promise<number[]>{
        const chainId = params.chainId;
        const days = params.days;
        const allTime = params.allTime;
        return this.borrowsService.getOptionFeesHistory(chainId,days,allTime);
    }

    @Get('/chart/ratio/:chainId/:days/:allTime')
    getRatioHistory(@Param() params:{chainId:number;days:number;allTime:AllTime}):Promise<number[]>{
        const chainId = params.chainId;
        const days = params.days;
        const allTime = params.allTime;
        return this.borrowsService.getRatioHistory(chainId,days,allTime);
    }

    @Get('/chart/borrowingFees/:chainId/:days/:allTime')
    getBorrowingFeesHistory(@Param() params:{chainId:number;days:number;allTime:AllTime}):Promise<number[]>{
        const chainId = params.chainId;
        const days = params.days;
        const allTime = params.allTime;
        return this.borrowsService.getBorrowingFeesHistory(chainId,days,allTime);
    }

    @Get('/chart/amintPrice/:chainId/:days/:allTime')
    getAmintPriceHistory(@Param() params:{chainId:number;days:number;allTime:AllTime}):Promise<number[]>{
        const chainId = params.chainId;
        const days = params.days;
        const allTime = params.allTime;
        return this.borrowsService.getAmintPriceHistory(chainId,days,allTime);
    }
        // To get the total deposits in all chains
  @Get('/leaderboard')
  getBorrowLeaderboard(): Promise<BorrowerInfo[]> {
    return this.borrowsService.getBorrowLeaderboardData();
  }
    
    // To add the deposit in borrowing
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

    // To withdraw the positions
    @Patch('/withdraw')
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
    withdraw(@Body() withdrawDto:WithdrawDto):Promise<BorrowInfo>{
        return this.borrowsService.withdraw(withdrawDto);
    }

    // @Patch('/calculatePeriodicFee')
    // @Header("Access-Control-Allow-Origin" , "*")
    // @Header("Access-Control-Allow-Credentials" , 'true')
    // calculatePeriodicFee(){
    //     return this.borrowsService.calculatePeriodicFee();
    // }
}
