import { IsNotEmpty } from "class-validator";

export class WithdrawDto{

    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    chainId:number;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    borrowDebt:string;

    @IsNotEmpty()
    withdrawTime:string;

    @IsNotEmpty()
    withdrawAmount:string;

    @IsNotEmpty()
    noOfAbond:string;

    @IsNotEmpty()
    totalDebtAmount:string;
}