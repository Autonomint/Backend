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

    @Column({nullable:true})
    depositedAmint:string;

    @Column({
        type:'bigint',
        nullable:true})
    depositedTime:BigInt;

    @Column({
        type:'decimal',
        nullable:true})
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

    @Column({nullable:true})
    liquidationAmount:string;

    @Column({type:'boolean'})
    optedForLiquidation:boolean;

    @Column({
        type:'bigint',
        nullable:true})
    withdrawTime:BigInt;

    @Column({
        type:'decimal',
        nullable:true})
    withdrawAmount:number;

    @Column({
        type:'decimal',
        nullable:true})
    withdrawEthAmount:number;

    @Column({ nullable: true })
    fees:string;

    @Column()
    status: CdsPositionStatus;

    @ManyToOne(() => CdsDepositorInfo,(cdsDepositor) => cdsDepositor.deposits,{cascade:true})
    cdsDepositor:CdsDepositorInfo;
}