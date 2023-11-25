import { IsNotEmpty } from "class-validator";

export class WithdrawCdsDto{

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    withdrawAmount:string;

    @IsNotEmpty()
    withdrawTime:string;

    @IsNotEmpty()
    withdrawEthAmount:string;

    @IsNotEmpty()
    ethPriceAtWithdraw:number;

    @IsNotEmpty()
    fees:string;

    @IsNotEmpty()
    feesWithdrawn:string;
}