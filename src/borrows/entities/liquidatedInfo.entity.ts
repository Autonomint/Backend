import { Column,PrimaryGeneratedColumn,Entity } from 'typeorm';

@Entity()
export class LiquidationInfo{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    chainId:number;

    @Column()
    index:number;

    @Column({
        type:'decimal',
        nullable: true })
    liquidationAmount:number;

    @Column({
        type:'decimal',
        nullable: true })
    profits:number;

    @Column({
        type:'decimal',
        nullable: true })
    ethAmount:number;

    @Column({
        type:'decimal',
        nullable: true })
    availableLiquidationAmount:number;

}