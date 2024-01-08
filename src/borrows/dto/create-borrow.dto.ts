import {IsNotEmpty} from "class-validator";
import { StrikePricePercent } from "../borrow-strike-price.enum";

export class AddBorrowDto{
    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    chainId:number;
    
    @IsNotEmpty()
    collateralType:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    downsideProtectionPercentage:number

    @IsNotEmpty()
    aprAtDeposit:number;

    @IsNotEmpty()
    depositedAmount:string;

    @IsNotEmpty()
    normalizedAmount:string;

    @IsNotEmpty()
    depositedTime:string;

    @IsNotEmpty()
    ethPrice:number;

    @IsNotEmpty()
    noOfAmintMinted:string;

    @IsNotEmpty()
    strikePrice:number;

    @IsNotEmpty()
    strikePricePercent:number;

    @IsNotEmpty()
    optionFees:string;
}