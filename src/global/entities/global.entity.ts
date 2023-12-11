import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GlobalVariables{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'decimal',
        nullable:true})
    treasuryAmintBalanceEthereum: number;

    @Column({
        type:'decimal',
        nullable:true})
    treasuryAmintBalancePolygon: number;

    @Column({
        type:'decimal',
        nullable:true})
    treasuryEthBalanceEthereum: number;

    @Column({
        type:'decimal',
        nullable:true})
    treasuryEthBalancePolygon: number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAvailableLiquidationAmountInEthereum: number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAvailableLiquidationAmountInPolygon: number;

    @Column({
        type:'decimal',
        nullable:true})
    liquidationIndexInEthereum: number;

    @Column({
        type:'decimal',
        nullable:true})
    liquidationIndexInPolygon: number;
}