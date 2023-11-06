import {IsOptional,IsEnum,IsString,IsNumber} from 'class-validator';
import { PositionStatus } from '../deposit-status.enum';
import { Type } from 'class-transformer';

export class GetDepositFilterDto{
    @IsOptional()
    @IsString()
    address:string;

    @IsOptional()
    @IsString()
    collateralType:string;

    @IsOptional()
    @Type(() => Number)
    index:number;

    @IsOptional()
    @Type(() => Number)
    depositedAmount:number;

    @IsOptional()
    @Type(() => Number)
    depositedTime:number;

    @IsOptional()
    @Type(() => Number)
    ethPrice:number;

    @IsOptional()
    @Type(() => Number)
    noOfAmintMinted:number;

    @IsOptional()
    @Type(() => Number)
    strikePrice:number;

    @IsOptional()
    @IsEnum(PositionStatus)
    status:PositionStatus

}