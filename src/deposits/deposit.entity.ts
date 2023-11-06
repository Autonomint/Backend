import { Entity,Column, PrimaryGeneratedColumn } from 'typeorm'
import { PositionStatus } from './deposit-status.enum';


@Entity()
export class Deposit{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    address:string;

    @Column()
    collateralType:string;

    @Column()
    index:number;

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