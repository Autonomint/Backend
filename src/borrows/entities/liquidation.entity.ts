import { Column,PrimaryGeneratedColumn,Entity } from 'typeorm';

@Entity()
export class CriticalPositions{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    //Deposit Id
    @Column()
    positionId:string;

    @Column()
    address:string;

    @Column()
    index:number;

    @Column({nullable:true})
    depositedEthAmount:string;

    //83% of deposit eth price
    @Column({
        type:'decimal',
        nullable: true })
    criticalEthPrice:number;

    @Column({
        type:'decimal',
        nullable: true })
    ethPriceAtDeposit:number;

    // 80% of eth price
    @Column({
        type:'decimal',
        nullable: true })
    ethPriceAtLiquidation:number;
}