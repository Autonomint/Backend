import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { PositionStatus } from '../borrow-status.enum';
import { BorrowerInfo } from './borrower.entity';
import { Type } from 'class-transformer';
import { StrikePricePercent } from '../borrow-strike-price.enum';


@Entity()
export class BorrowInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    address:string;

    @Column({nullable:true})
    chainId:number;

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

    @Column({nullable:true})
    strikePricePercent:StrikePricePercent;

    @Column({nullable:true})
    optionFees:string;

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

    @Column({nullable:true})
    amountYetToWithdraw:string;

    @Column({
        type:'decimal',
        nullable:true})
    noOfAbondMinted:number;

    @Column()
    status: PositionStatus;

    @ManyToOne(() => BorrowerInfo,(borrower) => borrower.borrows,{cascade:true})
    borrower:BorrowerInfo;
}