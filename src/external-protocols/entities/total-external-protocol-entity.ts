import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from 'typeorm';
import { ExternalProtocolDepositData } from './external-protocol.entity';

@Entity()
export class TotalExternalProtocolDepositData{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:true})
    protocolName:string;

    @Column({
        type:'decimal',
        nullable:true})
    chainId:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalIndex:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalDepositedEthAmount:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalCreditedTokens:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalWithdrewAmount:number;

    @Column({
        type:'decimal',
        nullable:true})
    totalInterestGained:number;

    @OneToMany(() => ExternalProtocolDepositData, (deposit) => deposit.totalDeposits,{ eager: true })
    deposits:ExternalProtocolDepositData[]
}