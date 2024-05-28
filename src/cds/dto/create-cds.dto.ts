import {IsBoolean, IsNotEmpty} from "class-validator";

export class AddCdsDto{
    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    chainId:number;

    @IsNotEmpty()
    collateralType:string;

    @IsNotEmpty()
    index:number;

    @IsNotEmpty()
    aprAtDeposit:number;

    @IsNotEmpty()
    depositedAmint:string;

    @IsNotEmpty()
    depositedUsdt:string;

    @IsNotEmpty()
    depositedTime:string;

    @IsNotEmpty()
    ethPriceAtDeposit:number;

    @IsNotEmpty()
    lockingPeriod:number;

    @IsNotEmpty()
    optedForLiquidation:boolean;

    @IsNotEmpty()
    liquidationAmount:number;
}