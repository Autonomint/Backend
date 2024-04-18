import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CdsInfo } from './cds.entity';
import { Type } from 'class-transformer';

@Entity()
export class CdsDepositorInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  chainId: number;

  @Column({ nullable: true })
  totalIndex: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  totalDepositedAmint: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  totalDepositedUsdt: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  totalDepositedAmount: number;

  // Total fees accured by the user from all deposits
  @Column({
    type: 'decimal',
    nullable: true,
  })
  totalFees: number;

  // Total fees withdrawn by the user from all deposits
  @Column({
    type: 'decimal',
    nullable: true,
  })
  totalFeesWithdrawn: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  points: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  totalYields: number;

  @OneToMany(() => CdsInfo, (cdsInfo) => cdsInfo.cdsDepositor, { eager: true })
  deposits: CdsInfo[];
}
