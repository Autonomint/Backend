import { Column, Entity,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Deposit } from "./deposit.entity";

@Entity()
export class Depositor{

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


    @OneToMany(() => Deposit, (deposit) => deposit.depositor)
    deposits:Deposit[]
}