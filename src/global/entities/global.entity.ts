import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GlobalVariables{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'decimal',
        nullable:true})
    chainId:number;

    @Column({
        type:'decimal',
        nullable:true})
    treasuryAmintBalance: number;

    @Column({
        type:'decimal',
        nullable:true})
    treasuryEthBalance: number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAvailableLiquidationAmount: number;

    @Column({
        type:'decimal',
        nullable:true})
    liquidationIndex: number;
}