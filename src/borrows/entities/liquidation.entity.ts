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

    @Column({nullable:true})
    depositedEthAmount:string;

    @Column({
        type:'decimal',
        nullable: true })
    criticalEthPrice:number;

    @Column({
        type:'decimal',
        nullable: true })
    ethPriceAtDeposit:number;

    @Column({
        type:'decimal',
        nullable: true })
    ethPriceAtLiquidation:number;
}