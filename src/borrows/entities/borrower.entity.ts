import { Column, Entity,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BorrowInfo } from "./borrow.entity";
import { Type } from "class-transformer";

@Entity()
export class BorrowerInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    address:string;

    @Column({nullable:true})
    totalIndexInEthereum:number;

    @Column({nullable:true})
    totalIndexInPolygon:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalDepositedAmountInEthereum:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalDepositedAmountInPolygon:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAmintInEthereum:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAmintInPolygon:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAbondInEthereum:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAbondInPolygon:number;

    @OneToMany(() => BorrowInfo, (borrowInfo) => borrowInfo.borrower,{ eager: true })
    borrows:BorrowInfo[]
}