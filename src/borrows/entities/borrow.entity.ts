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

    @Column()
    depositedTime:number;

    @Column({
        type:'decimal',
        nullable: true })
    ethPrice:number;

    @Column({
        type:'decimal',
        nullable: true })
    liquidationEthPrice:number;

    @Column({
        type:'decimal',
        nullable: true })
    criticalEthPrice:number;

    @Column({nullable:true})
    noOfAmintMinted:string;

    @Column({
        type:'decimal',
        nullable: true })
    strikePrice:number;

    @Column({ nullable: true })
    withdrawTime1:number;

    @Column({ nullable: true })
    withdrawTime2:number;

    @Column({
        type:'decimal',
        nullable: true })
    withdrawAmount1:number;

    @Column({
        type:'decimal',
        nullable: true })
    withdrawAmount2:number;

    @Column({
        type:'decimal',
        nullable: true })
    amountYetToWithdraw:number;

    @Column({
        type:'decimal',
        nullable: true })
    noOfAbondMinted:number;

    @Column()
    status: PositionStatus;

    @ManyToOne(() => BorrowerInfo,(borrower) => borrower.borrows,{cascade:true})
    borrower:BorrowerInfo;
}