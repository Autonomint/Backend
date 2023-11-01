import { PositionStatus } from "../deposit-status.enum";
import{IsNotEmpty,IsEnum} from "class-validator"

export class CreateDepositDto{
    @IsNotEmpty()
    address:string;

    @IsNotEmpty()
    collateralType:string;

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