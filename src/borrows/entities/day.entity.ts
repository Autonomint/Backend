import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from 'typeorm';

@Entity()
export class Days{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:true})
    chainId:number;

    @Column({nullable:true})
    days:number;
}