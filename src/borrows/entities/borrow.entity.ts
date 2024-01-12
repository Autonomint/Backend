import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { PositionStatus } from '../borrow-status.enum';
import { BorrowerInfo } from './borrower.entity';
import { Type } from 'class-transformer';
import { StrikePricePercent } from '../borrow-strike-price.enum';
import { Batch } from './batch.entity';


@Entity()
export class BorrowInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    address:string;

    @Column({nullable:true})
    chainId:number;

    @Column({nullable:true})
    batchNo:number;

    @Column()
    index:number;

    @Column()
    collateralType:string;

    @Column({
        type:'decimal',
        nullable:true})
    downsideProtectionPercentage:number

    @Column({
        type:'decimal',
        nullable:true})
    aprAtDeposit:number

    @Column({ nullable: true })
    depositedAmount:string;

    @Column({ nullable: true })
    normalizedAmount:string;

    @Column({ nullable:true})
    depositedTime:string;

    @Column({
        type:'decimal',
        nullable:true})
    ethPrice:number;

    @Column({
        type:'decimal',
        nullable:true})
    liquidationEthPrice:number;

    @Column({
        type:'decimal',
        nullable:true})
    criticalEthPrice:number;

    @Column({nullable:true})
    noOfAmintMinted:string;

    @Column({
        type:'decimal',
        nullable:true})
    strikePrice:number;

    //Strike price that the depositor chose Eg:5%,10%,15%
    @Column({nullable:true})
    strikePricePercent:StrikePricePercent;

    @Column({nullable:true})
    optionFees:string;

    @Column({type:'boolean'})
    downsideProtectionStatus:boolean;

    //Option fees deducted till now
    @Column({nullable:true})
    totalFeesDeducted:string;

    @Column({nullable:true})
    totalDebtAmount:string;

    @Column({ nullable:true})
    withdrawTime1:string;

    @Column({ nullable:true})
    withdrawTime2:string;

    @Column({nullable:true})
    withdrawAmount1:string;

    @Column({ nullable:true})
    withdrawAmount2:string;

    //Amount yet to withdraw for 2nd time
    @Column({nullable:true})
    amountYetToWithdraw:string;

    @Column({
        type:'decimal',
        nullable:true})
    noOfAbondMinted:number;

    // Status of the deposit
    @Column()
    status: PositionStatus;

    @ManyToOne(() => BorrowerInfo,(borrower) => borrower.borrows,{cascade:true})
    borrower:BorrowerInfo;

    @ManyToOne(() => Batch,(batch) => batch.deposits,{cascade:true})
    batch:Batch;
}