import { Entity,PrimaryGeneratedColumn,Column } from 'typeorm';
import { PositionStatus } from '../borrow-status.enum';
import { index } from 'ccxt/js/src/base/functions';

@Entity()
export class HighLTVPositions{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    positionId:string;

    @Column()
    chainId:number;

    @Column()
    batchNo:number;

    @Column()
    address:string;

    @Column()
    index:number;

    @Column()
    status:PositionStatus;
}