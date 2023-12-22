import { IsNotEmpty } from "class-validator";

export class AddDepositDto{

    @IsNotEmpty()
    protocolName:string;

    @IsNotEmpty()
    chainId:number;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    ethPriceAtDeposit:number;

    @IsNotEmpty()
    depositedAmount:string;
    
    @IsNotEmpty()
    creditedTokens:string;
}