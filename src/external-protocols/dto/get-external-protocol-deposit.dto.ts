import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class GetExternalProtocolDepositDto{
    @IsString()
    protocolName:string;

    @IsNumber()
    @Type(() => Number)
    chainId:number;

    @IsNumber()
    @Type(() => Number)
    index:number;
}