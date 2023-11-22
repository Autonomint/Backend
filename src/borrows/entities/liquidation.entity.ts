import { Column,PrimaryGeneratedColumn,Entity } from 'typeorm';

@Entity()
export class CriticalPositions{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    positionId:string;

    @Column()
    address:string;

    @Column()
    index:number;

    @Column()
    depositedEthAmount:string;

    @Column({
        type:'decimal',
        nullable: true })
    criticalEthPrice:BigInt;

    @Column({
        type:'decimal',
        nullable: true })
    ethPriceAtDeposit:BigInt;

    @Column({
        type:'decimal',
        nullable: true })
    ethPriceAtLiquidation:BigInt;
}