import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CdsPositionStatus } from '../cds-status.enum';
import { CdsDepositorInfo } from './cdsDepositor.entity';


@Entity()
export class CdsInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    address:string;

    @Column()
    index:number;

    @Column({
        type:'decimal',
        nullable:true})
    depositedAmint:string;

    @Column()
    depositedTime:number;

    @Column({type:'decimal'})
    ethPriceAtDeposit:number;

    @Column({
        type:'decimal',
        nullable:true})
    apr:number;

    @Column({
        type:'decimal',
        nullable:true})
    lockingPeriod:number;

    @Column({
        type:'decimal',
        nullable: true })
    ethPriceAtWithdraw:number;

    @Column()
    liquidationAmount:string;

    @Column({type:'boolean'})
    optedForLiquidation:boolean;

    @Column({ nullable: true })
    withdrawTime:number;

    @Column({
        type:'decimal',
        nullable: true })
    withdrawAmount:number;

    @Column({
        type:'decimal',
        nullable: true })
    withdrawEthAmount:number;

    @Column()
    status: CdsPositionStatus;

    @ManyToOne(() => CdsDepositorInfo,(cdsDepositor) => cdsDepositor.deposits,{cascade:true})
    cdsDepositor:CdsDepositorInfo;
}