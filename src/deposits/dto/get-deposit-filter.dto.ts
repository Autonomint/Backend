import {IsOptional,IsEnum,IsString,IsNumber} from 'class-validator';
import { PositionStatus } from '../deposit-status.enum';

export class GetDepositFilterDto{
    @IsOptional()
    @IsString()
    address:string;

    @IsOptional()
    @IsString()
    collateralType:string;

    @IsOptional()
    @IsNumber()
    index:number;

    @IsOptional()
    @IsNumber()
    depositedAmount:number;

    @IsOptional()
    @IsNumber()
    depositedTime:number;

    @IsOptional()
    @IsNumber()
    ethPrice:number;

    @IsOptional()
    @IsNumber()
    noOfAmintMinted:number;

    @IsOptional()
    @IsNumber()
    strikePrice:number;

    @IsOptional()
    @IsEnum(PositionStatus)
    status:PositionStatus

}