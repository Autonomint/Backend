import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from 'typeorm';

@Entity()
export class AmintPrice{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:true})
    chainId:number;

    @Column()
    day:number;

    @Column({
        nullable:true,
        type:'decimal'})
    amintPrice:number;

}