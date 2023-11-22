import { IsNotEmpty } from "class-validator";

export class WithdrawDto{

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    borrowDebt:string;

    @IsNotEmpty()
    withdrawTime:BigInt;

    @IsNotEmpty()
    withdrawAmount:BigInt;

    @IsNotEmpty()
    amountYetToWithdraw:BigInt;

    @IsNotEmpty()
    noOfAbond:string;
}