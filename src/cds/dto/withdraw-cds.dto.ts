import { IsNotEmpty } from "class-validator";

export class WithdrawCdsDto{

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    withdrawAmount:BigInt;

    @IsNotEmpty()
    withdrawTime:BigInt;

    @IsNotEmpty()
    withdrawEthAmount:BigInt;

    @IsNotEmpty()
    ethPriceAtWithdraw:number;

    @IsNotEmpty()
    fees:string;

    @IsNotEmpty()
    feesWithdrawn:string;
}