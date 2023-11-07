import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { PositionStatus } from './deposit-status.enum';
import { Depositor } from './depositor.entity';


@Entity()
export class Deposit{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    index:number;

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

    @ManyToOne(() =>Depositor,(depositor) => depositor.deposits)
    depositor:Depositor;
}