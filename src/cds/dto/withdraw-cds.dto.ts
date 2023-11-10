import { IsNotEmpty } from "class-validator";

export class WithdrawCdsDto{

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    withdrawAmount:number;

    @IsNotEmpty()
    withdrawTime:number;

    @IsNotEmpty()
    withdrawEthAmount:number;

    @IsNotEmpty()
    ethPriceAtWithdraw:number;
}