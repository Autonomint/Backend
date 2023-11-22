import { Column, Entity,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BorrowInfo } from "./borrow.entity";
import { Type } from "class-transformer";

@Entity()
export class BorrowerInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    address:string;

    @Column()
    totalIndex:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalDepositedAmount:BigInt;

    @Column({
        type:'bigint',
        nullable:true})
    totalAmint:BigInt;

    @Column({
        type:'bigint',
        nullable:true})
    totalAbond:BigInt;

    @OneToMany(() => BorrowInfo, (borrowInfo) => borrowInfo.borrower,{ eager: true })
    borrows:BorrowInfo[]
}