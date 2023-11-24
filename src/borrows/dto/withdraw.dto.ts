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
    withdrawAmount:number;

    @IsNotEmpty()
    amountYetToWithdraw:number;

    @IsNotEmpty()
    noOfAbond:string;
}