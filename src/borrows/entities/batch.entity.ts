import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from 'typeorm';
import { BorrowInfo } from './borrow.entity';

@Entity()
export class Batch{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:true})
    chainId:number;

    @Column({nullable:true})
    batchNo:number;

    @OneToMany(() => BorrowInfo, (borrowInfo) => borrowInfo.batch,{ eager: true })
    deposits:BorrowInfo[]
}