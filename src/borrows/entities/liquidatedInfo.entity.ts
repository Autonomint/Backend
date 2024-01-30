import { Column,PrimaryGeneratedColumn,Entity } from 'typeorm';

@Entity()
export class LiquidationInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    chainId:number;

    @Column()
    index:number;

    //Amount needed for liquidation in amint
    @Column({
        type:'decimal',
        nullable: true })
    liquidationAmount:number;

    //Profits gained from liquidation in ETH
    @Column({
        type:'decimal',
        nullable: true })
    profits:number;

    // Eth gained through liquidation
    @Column({
        type:'decimal',
        nullable: true })
    ethAmount:number;

    //Available liquidation amount in treasury
    @Column({
        type:'decimal',
        nullable: true })
    availableLiquidationAmount:number;

}