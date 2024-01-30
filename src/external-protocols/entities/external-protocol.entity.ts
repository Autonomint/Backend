import { Entity,PrimaryGeneratedColumn,Column,ManyToOne } from 'typeorm'
import { TotalExternalProtocolDepositData } from './total-external-protocol-entity';

@Entity()
export class ExternalProtocolDepositData{

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
    index:number;

    @Column({nullable:true})
    depositedAmount:string;

    @Column({nullable:true})
    creditedTokens:string;

    @Column({nullable:true})
    withdrawAmount:string;

    @Column({nullable:true})
    interestGained:string;

    @ManyToOne(() => TotalExternalProtocolDepositData,(totalDeposits) => totalDeposits.deposits,{cascade:true})
    totalDeposits:TotalExternalProtocolDepositData;
}