import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()
export class Charts{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    chainId:number;

    @Column()
    day:number;

    @Column({
        nullable:true,
        type:'decimal'})
    borrowingFees:number;

    @Column({
        nullable:true,
        type:'decimal'})
    optionFees:number;

    @Column({
        nullable:true,
        type:'decimal'})
    amintPrice:number;

    @Column({
        nullable:true,
        type:'decimal'})
    ratio:number;
}