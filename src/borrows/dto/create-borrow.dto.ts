import {IsNotEmpty} from "class-validator";

export class AddBorrowDto{
    @IsNotEmpty()
    address:string;
    
    @IsNotEmpty()
    collateralType:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    depositedAmount:string;

    @IsNotEmpty()
    depositedTime:string;

    @IsNotEmpty()
    ethPrice:number;

    @IsNotEmpty()
    noOfAmintMinted:string;

    @IsNotEmpty()
    strikePrice:number;
}