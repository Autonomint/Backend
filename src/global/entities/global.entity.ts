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
    totalCdsDepositedAmount: number;

    @Column({
        type:'decimal',
        nullable:true})
    totalBorrowDepositedETH: number;

    @Column({
        type:'decimal',
        nullable:true})
    totalAvailableLiquidationAmount: number;

    @Column({
        type:'decimal',
        nullable:true})
    liquidationIndex: number;

    @Column({
        type:'decimal',
        nullable:true})
    lastEthPrice: number;

    @Column({
        type:'decimal',
        nullable:true})
    fallbackEthPrice: number;

    @Column({
        type:'decimal',
        nullable:true})
    batchNo: number;

    @Column({
        type:'decimal',
        nullable:true})
    cumulativeValue: number;

    @Column({nullable:true})
    day: number;

    @Column({ nullable:true })
    noOfUsers: number;
}