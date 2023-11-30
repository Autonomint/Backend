import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class GetCdsDepositByChainId{
    @IsString()
    address:string;

    @IsNumber()
    @Type(() => Number)
    chainId:number;
}