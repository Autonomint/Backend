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
    totalIndex:number;

    @Column()
    totalDepositedAmount:number

    @OneToMany(() => CdsInfo, (cdsInfo) => cdsInfo.cdsDepositor)
    deposits:CdsInfo[]
}