import { Column, Entity,OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CdsInfo } from "./cds.entity";
import { Type } from "class-transformer";

@Entity()
export class CdsDepositorInfo{

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
    totalDepositedAmintInEthereum:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalDepositedAmintInPolygon:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalFeesInEthereum:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalFeesInPolygon:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalFeesWithdrawnInEthereum:number;

    @Column({
        type:'decimal',
        nullable: true })
    totalFeesWithdrawnInPolygon:number;

    @OneToMany(() => CdsInfo, (cdsInfo) => cdsInfo.cdsDepositor,{ eager: true })
    deposits:CdsInfo[]
}