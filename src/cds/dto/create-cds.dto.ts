import {IsNotEmpty} from "class-validator";

export class AddCdsDto{
    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    depositedAmount:string;

    @IsNotEmpty()
    depositedTime:number;

    @IsNotEmpty()
    ethPriceAtDeposit:number;

    @IsNotEmpty()
    optedForLiquidation:boolean;

    @IsNotEmpty()
    liquidationAmount:string;
}