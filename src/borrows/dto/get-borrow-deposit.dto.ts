import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class GetBorrowDeposit{
    @IsString()
    address:string;

    @IsNumber()
    @Type(() => Number)
    chainId:number;

    @IsNumber()
    @Type(() => Number)
    index:number;
}