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
    chainId:number;

    @Column({nullable:true})
    totalIndex:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalDepositedAmount:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAmint:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAbond:number;

    @OneToMany(() => BorrowInfo, (borrowInfo) => borrowInfo.borrower,{ eager: true })
    borrows:BorrowInfo[]
}