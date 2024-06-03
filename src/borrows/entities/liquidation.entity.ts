import { Column,PrimaryGeneratedColumn,Entity } from 'typeorm';
import { PositionStatus } from '../borrow-status.enum';

@Entity()
export class CriticalPositions{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:true})
    chainId:number;

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

    @Column()
    status:PositionStatus;
}