import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Points{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({ nullable:true })
    chainId:number;

    @Column()
    address:string;

    @Column({ nullable:true })
    perDayPoints:number

    @Column({ nullable:true })
    lastEventTime:string;

    @Column({ nullable:true })
    lastUpdatedPoints:number

    // @Column({
    //     type:'boolean',
    //     nullable:true
    // })
    // hasDepositedCollateral:boolean;

    @Column({ nullable:true })
    borrowIndex:number

    // @Column({
    //     type: 'boolean',
    //     nullable:true
    // })
    // hasDepositedUSDaInCDS:boolean;

    // @Column({
    //     type: 'boolean',
    //     nullable:true
    // })
    // hasDepositedUSDTInCDS:boolean;

    @Column({ nullable:true })
    usdaCDSIndexEligible:number

    @Column({ nullable:true })
	usdtCDSIndexEligible:number

    @Column({ nullable:true })
    usdaBridgedToMode:string;

    @Column({ nullable:true })
    noOfReferrals:number;

    @Column({ nullable: true})
    noOfPostsInX:number
}