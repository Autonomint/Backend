import { Entity,PrimaryColumnOptions,Column } from 'typeorm'
import { PositionStatus } from './deposit-status.enum';


@Entity()
export class Deposit{
    @Column()
    address:string;

    @Column()
    collateralType:string;

    @Column()
    depositedAmount:number;

    @Column()
    depositedTime:number;

    @Column()
    ethPrice:number;

    @Column()
    noOfAmintMinted:number;

    @Column()
    strikePrice:number;

    @Column()
    status: PositionStatus;
}