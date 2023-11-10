import {IsOptional,IsEnum,IsString,IsNumber} from 'class-validator';
import { CdsPositionStatus } from '../cds-status.enum';
import { Type } from 'class-transformer';

export class GetCdsFilterDto{
    @IsOptional()
    @IsString()
    address:string;

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
    apr:number;

    @IsOptional()
    @Type(() => Number)
    lockingPeriod:number;

    @IsOptional()
    optedForLiquidation:boolean;

    @IsOptional()
    @Type(() => Number)
    liquidationAmount:number

    @IsOptional()
    @IsEnum(CdsPositionStatus)
    status:CdsPositionStatus

}