import {IsBoolean, IsNotEmpty} from "class-validator";

export class AddCdsDto{
    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    depositedAmint:string;

    @IsNotEmpty()
    depositedTime:BigInt;

    @IsNotEmpty()
    ethPriceAtDeposit:number;

    @IsNotEmpty()
    apr:number;

    @IsNotEmpty()
    lockingPeriod:number;

    @IsNotEmpty()
    optedForLiquidation:boolean;

    @IsNotEmpty()
    liquidationAmount:string;
}