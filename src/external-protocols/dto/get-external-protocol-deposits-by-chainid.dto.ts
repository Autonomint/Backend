import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class GetExternalProtocolDepositByChainIdDto{
    @IsString()
    protocolName:string;

    @IsNumber()
    @Type(() => Number)
    chainId:number;
}