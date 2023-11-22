import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { PositionStatus } from '../borrow-status.enum';
import { BorrowerInfo } from './borrower.entity';
import { Type } from 'class-transformer';


@Entity()
export class BorrowInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    address:string;

    @Column()
    index:number;

    @Column()
    collateralType:string;

    @Column({
        type:'decimal',
        nullable: true })
    depositedAmount:string;

    @Column({
        type:'bigint',
        nullable:true})
    depositedTime:BigInt;

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

    @Column({
        type:'bigint',
        nullable:true})
    withdrawTime1:BigInt;

    @Column({
        type:'bigint',
        nullable:true})
    withdrawTime2:BigInt;

    @Column({
        type:'bigint',
        nullable:true})
    withdrawAmount1:BigInt;

    @Column({
        type:'bigint',
        nullable:true})
    withdrawAmount2:BigInt;

    @Column({
        type:'bigint',
        nullable:true})
    amountYetToWithdraw:BigInt;

    @Column({
        type:'bigint',
        nullable:true})
    noOfAbondMinted:BigInt;

    @Column()
    status: PositionStatus;

    @ManyToOne(() => BorrowerInfo,(borrower) => borrower.borrows,{cascade:true})
    borrower:BorrowerInfo;
}