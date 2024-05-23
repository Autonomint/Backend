import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PointsService } from './points.service';

@Controller('points')
export class PointsController {
    constructor(private pointsService:PointsService){}

    // Get the amint balance
    @Get('/userPoints/:chainId/:address')
    getAmintBalance(@Param() params:{chainId:number;address:string;}):Promise<number>{
        const address = params.address;
        const chainId = params.chainId;
        return this.pointsService.getUserPoints(chainId,address);
    }
}
