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

    @Column()
    totalDepositedAmount:number

    @Column()
    totalAmint:number;

    @Column()
    totalAbond:number;

    @OneToMany(() => BorrowInfo, (borrowInfo) => borrowInfo.borrower)
    borrows:BorrowInfo[]
}