import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { CdsPositionStatus } from '../cds-status.enum';
import { CdsDepositorInfo } from './cdsDepositor.entity';


@Entity()
export class CdsInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    address:string;

    @Column({nullable:true})
    chainId:number;

    @Column()
    index:number;

    @Column({nullable:true})
    depositedAmint:string;

    @Column({ nullable:true})
    depositedTime:string;

    @Column({
        type:'decimal',
        nullable:true})
    ethPriceAtDeposit:number;

    @Column({
        type:'decimal',
        nullable:true})
    aprAtDeposit:number;

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

    @Column({ nullable:true})
    withdrawTime:string;

    @Column({
        type:'decimal',
        nullable:true})
    withdrawAmount:string;

    @Column({
        type:'decimal',
        nullable:true})
    withdrawEthAmount:string;

    @Column({ nullable: true })
    fees:string;

    @Column()
    status: CdsPositionStatus;

    @ManyToOne(() => CdsDepositorInfo,(cdsDepositor) => cdsDepositor.deposits,{cascade:true})
    cdsDepositor:CdsDepositorInfo;
}