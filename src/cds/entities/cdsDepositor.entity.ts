import { Column, Entity,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CdsInfo } from "./cds.entity";
import { Type } from "class-transformer";

@Entity()
export class CdsDepositorInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    address:string;

    @Column()
    chainId:number;

    @Column({nullable:true})
    totalIndex:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalDepositedAmint:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalDepositedUsdt:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalDepositedAmount:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalFees:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalFeesWithdrawn:number;

    @OneToMany(() => CdsInfo, (cdsInfo) => cdsInfo.cdsDepositor,{ eager: true })
    deposits:CdsInfo[]
}