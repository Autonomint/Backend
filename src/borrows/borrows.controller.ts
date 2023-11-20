import { Body, Controller, Get, Header, Param, Patch, Post, Query} from '@nestjs/common';
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

    @Get('/index/:address')
    getDepositorIndexByAddress(@Param('address') address:string):Promise<number>{
            return this.borrowsService.getDepositorIndexByAddress(address);
    }

    @Get('/:address')
    getDepositorByAddress(@Param('address') address:string):Promise<BorrowerInfo>{
        return this.borrowsService.getDepositorByAddress(address);
    }

<<<<<<< HEAD
    @Post('/borrowAmint')
=======
    @Post()
    @Header("Access-Control-Allow-Origin" , "*")
    @Header("Access-Control-Allow-Credentials" , 'true')
>>>>>>> 720f9a4b7883fad49a7e2623a45692660deb0d2b
    addBorrow(@Body() addBorrowDto:AddBorrowDto):Promise<BorrowInfo>{
        return this.borrowsService.addBorrow(addBorrowDto);
    }

    @Post('/criticalposition')
    addCriticalPositions(@Body() ethPrice:string):Promise<CriticalPositions[]>{
        return this.borrowsService.createCriticalPositions(ethPrice);
    }

    @Patch('/withdraw')
    withdraw(@Body() withdrawDto:WithdrawDto):Promise<BorrowInfo>{
        return this.borrowsService.withdraw(withdrawDto);
    }
}
