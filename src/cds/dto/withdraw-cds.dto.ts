import { IsNotEmpty } from "class-validator";

export class WithdrawCdsDto{

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    withdrawAmount:number;

    @IsNotEmpty()
    withdrawTime:string;

    @IsNotEmpty()
    withdrawEthAmount:number;

    @IsNotEmpty()
    ethPriceAtWithdraw:number;

    @IsNotEmpty()
    fees:string;

    @IsNotEmpty()
    feesWithdrawn:string;
}