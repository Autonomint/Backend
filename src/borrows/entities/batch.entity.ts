import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from 'typeorm';
import { BorrowInfo } from './borrow.entity';

@Entity()
export class Batch{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    chainId:number;

    @Column()
    batchNo:number;

    @OneToMany(() => BorrowInfo, (borrowInfo) => borrowInfo.borrower,{ eager: true })
    deposits:BorrowInfo[]
}