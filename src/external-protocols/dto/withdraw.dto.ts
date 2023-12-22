import { IsNotEmpty } from "class-validator";

export class WithdrawExternalProtocolDto{

    @IsNotEmpty()
    protocolName:string;

    @IsNotEmpty()
    chainId:number;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    withdrawAmount:string;
    
    @IsNotEmpty()
    interestGained:string;
}