import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CdsAmountToReturn{
    @IsString()
    address:string;

    @IsNumber()
    @Type(() => Number)
    index:number;

    @IsNumber()
    @Type(() => Number)
    chainId:number;

    @IsNumber()
    @Type(() => Number)
    ethPrice:number;
}