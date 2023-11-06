import {IsNotEmpty} from "class-validator";

export class CreateDepositDto{
    @IsNotEmpty()
    address:string;
    
    @IsNotEmpty()
    collateralType:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    depositedAmount:number;

    @IsNotEmpty()
    depositedTime:number;

    @IsNotEmpty()
    ethPrice:number;

    @IsNotEmpty()
    noOfAmintMinted:number;

    @IsNotEmpty()
    strikePrice:number;
}