import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Points } from './entities/points.entity';

@Injectable()
export class PointsService {
    
    constructor(
        @InjectRepository(Points)
        private pointsRepository: Repository<Points>,
    ){}

    private chainIds = [5,11155111];

    // async setBorrowPoints(
    //     address:string,
    //     chainId:number,
    //     depositedAmount:number,
    //     depositedTime:Date,
    // ){
    //     if(depositedAmount && depositedAmount > 0){
    //         let found = await this.pointsRepository.findOne({ where:{
    //             chainId:chainId,
    //             address:address}
    //         })
    
    //         if(!found){
    //             found = this.pointsRepository.create({
    //                 chainId:chainId,
    //                 address:address,
    //                 borrowIndex: 1,
    //                 perDayPoints:10,
    //                 lastEventTime:depositedTime
    //             })
    //         }else {
    //             found.borrowIndex += 1;
    //             found.lastEventTime = depositedTime;
    //             found.lastUpdatedPoints = found.lastUpdatedPoints + (await this.getDaysBetween(found.lastEventTime,depositedTime) * found.perDayPoints);
    //             found.perDayPoints = found.perDayPoints + 10;
    //         }
    //     }
    // }

    // async setUSDaCDSPoints(
    //     address:string,
    //     chainId:number,
    //     depositedAmount:number,
    //     depositedTime:Date,
    // ){
    //     if(depositedAmount && depositedAmount > 500000000){
    //         let found = await this.pointsRepository.findOne({ where:{
    //             chainId:chainId,
    //             address:address}
    //         })
    
    //         if(!found){
    //             found = this.pointsRepository.create({
    //                 chainId:chainId,
    //                 address:address,
    //                 usdaCDSIndexEligible: 1,
    //                 perDayPoints:10,
    //                 lastEventTime:depositedTime
    //             })
    //         }else{
    //             found.usdaCDSIndexEligible += 1;
    //             found.lastEventTime = depositedTime;
    //             found.lastUpdatedPoints = found.lastUpdatedPoints + (await this.getDaysBetween(found.lastEventTime,depositedTime) * found.perDayPoints)
    //             found.perDayPoints = found.perDayPoints + 10;
    //         }
    //     }
    // }

    // async setUSDTCDSPoints(
    //     address:string,
    //     chainId:number,
    //     depositedAmount:number,
    //     depositedTime:Date,
    // ){
    //     if(depositedAmount && depositedAmount > 500000000){
    //         let found = await this.pointsRepository.findOne({ where:{
    //             chainId:chainId,
    //             address:address}
    //         })
    
    //         if(!found){
    //             found = this.pointsRepository.create({
    //                 chainId:chainId,
    //                 address:address,
    //                 usdtCDSIndexEligible: 1,
    //                 perDayPoints:5,
    //                 lastEventTime:depositedTime
    //             })
    //         }else{
    //             found.usdtCDSIndexEligible += 1;
    //             found.lastEventTime = depositedTime;
    //             found.lastUpdatedPoints = found.lastUpdatedPoints + (await this.getDaysBetween(found.lastEventTime,depositedTime) * found.perDayPoints)
    //             found.perDayPoints = found.perDayPoints + 5;
    //         }
    //     }
    // }

    // async setReferralPoints(
    //     address:string,
    //     chainId:number,
    //     referred:boolean,
    //     depositedTime:Date,
    // ){
    //     if(referred){
    //         let found = await this.pointsRepository.findOne({ where:{
    //             chainId:chainId,
    //             address:address}
    //         })
    
    //         if(!found){
    //             found = this.pointsRepository.create({
    //                 chainId:chainId,
    //                 address:address,
    //                 noOfReferrals: 1,
    //                 perDayPoints:5,
    //                 lastEventTime:depositedTime
    //             })
    //         }else{
    //             found.noOfReferrals += 1;
    //             found.lastEventTime = depositedTime;
    //             found.lastUpdatedPoints = found.lastUpdatedPoints + (await this.getDaysBetween(found.lastEventTime,depositedTime) * found.perDayPoints)
    //             found.perDayPoints = found.perDayPoints + 5;
    //         }
    //     }
    // }

    // async setPostsInXPoints(
    //     address:string,
    //     chainId:number,
    //     posted:boolean,
    //     depositedTime:Date,
    // ){
    //     if(posted){
    //         let found = await this.pointsRepository.findOne({ where:{
    //             chainId:chainId,
    //             address:address}
    //         })
    
    //         if(!found){
    //             found = this.pointsRepository.create({
    //                 chainId:chainId,
    //                 address:address,
    //                 noOfPostsInX: 1,
    //                 perDayPoints:5,
    //                 lastEventTime:depositedTime
    //             })
    //         }else{
    //             found.noOfPostsInX += 1;
    //             found.lastEventTime = depositedTime;
    //             found.lastUpdatedPoints = found.lastUpdatedPoints + (await this.getDaysBetween(found.lastEventTime,depositedTime) * found.perDayPoints)
    //             found.perDayPoints = found.perDayPoints + 5;
    //         }
    //     }
    // }

    async getDaysBetween(date1: string, date2: string): Promise<number> {
        // Get the difference in milliseconds
        const timeDiff = Math.abs(parseInt(date2) - parseInt(date1));
      
        // Convert milliseconds to days by dividing by the number of milliseconds in a day
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      
        return daysDiff;
    }

    async getUserPoints(chainId:number,address:string):Promise<number>{
        const found = await this.pointsRepository.findOne({where:{
            chainId,address
        }})

        if(found){
            return found.lastUpdatedPoints;
        }else{
            return 0;
        }
    }

    async setBorrowPoints(
        address:string,
        chainId:number,
        depositedAmount:string,
        depositedTime:string,
    ){
        if(parseInt(depositedAmount) && parseInt(depositedAmount) >= 0.05){
            let found = await this.pointsRepository.findOne({ where:{
                chainId:chainId,
                address:address}
            })
    
            if(!found){
                found = this.pointsRepository.create({
                    chainId:chainId,
                    address:address,
                    borrowIndex: 1,
                    perDayPoints:10,
                    lastUpdatedPoints:10,
                    lastEventTime:depositedTime
                })
            }else {
                if(found.borrowIndex == 0){
                    found.borrowIndex += 1;
                    found.lastEventTime = depositedTime;
                    found.lastUpdatedPoints += 10;
                    // found.perDayPoints = found.perDayPoints + 10;
                }

            }

            await this.pointsRepository.save(found);
        }
    }

    async setUSDaCDSPoints(
        address:string,
        chainId:number,
        depositedAmount:string,
        depositedTime:string,
    ){
        if(parseInt(depositedAmount) && parseInt(depositedAmount) > 200){
            let found = await this.pointsRepository.findOne({ where:{
                chainId:chainId,
                address:address}
            })
    
            if(!found){
                found = this.pointsRepository.create({
                    chainId:chainId,
                    address:address,
                    usdaCDSIndexEligible: 1,
                    perDayPoints:10,
                    lastUpdatedPoints:10,
                    lastEventTime:depositedTime
                })
            }else{
                if(found.usdaCDSIndexEligible == 0){
                    found.usdaCDSIndexEligible += 1;
                    found.lastEventTime = depositedTime;
                    found.lastUpdatedPoints += 10;
                    // found.perDayPoints = found.perDayPoints + 10;
                }

            }
            await this.pointsRepository.save(found);
        }
    }

    async setUSDTCDSPoints(
        address:string,
        chainId:number,
        depositedAmount:string,
        depositedTime:string,
    ){
        if(parseInt(depositedAmount) && parseInt(depositedAmount) > 200){
            let found = await this.pointsRepository.findOne({ where:{
                chainId:chainId,
                address:address}
            })
    
            if(!found){
                found = this.pointsRepository.create({
                    chainId:chainId,
                    address:address,
                    usdtCDSIndexEligible: 1,
                    perDayPoints:5,
                    lastUpdatedPoints:5,
                    lastEventTime:depositedTime
                })
            }else{
                if(found.usdtCDSIndexEligible == 0){
                    found.usdtCDSIndexEligible += 1;
                    found.lastEventTime = depositedTime;
                    found.lastUpdatedPoints += 5;
                    // found.perDayPoints = found.perDayPoints + 5;
                }

            }
            await this.pointsRepository.save(found);

        }
    }

    async setUSDaBridgeToModePoints(
        address:string,
        chainId:number,
        bridgedAmount:string,
        depositedTime:string,
    ){
        if(parseInt(bridgedAmount) > 200){
            let found = await this.pointsRepository.findOne({ where:{
                chainId:chainId,
                address:address}
            })
    
            if(!found){
                found = this.pointsRepository.create({
                    chainId:chainId,
                    address:address,
                    usdaBridgedToMode: bridgedAmount,
                    perDayPoints:10,
                    lastUpdatedPoints:10,
                    lastEventTime:depositedTime
                })
            }else{
                if(parseInt(found.usdaBridgedToMode) <= 200){
                    found.usdaBridgedToMode = (parseInt(found.usdaBridgedToMode) + parseInt(bridgedAmount)).toString();
                    found.lastEventTime = depositedTime;
                    found.lastUpdatedPoints += 10;
                    // found.perDayPoints = found.perDayPoints + 5;
                }

            }
            await this.pointsRepository.save(found);

        }
    }

    async setReferralPoints(
        address:string,
        chainId:number,
        referred:boolean,
        depositedTime:string,
    ){
        if(referred){
            let found = await this.pointsRepository.findOne({ where:{
                chainId:chainId,
                address:address}
            })
    
            if(!found){
                found = this.pointsRepository.create({
                    chainId:chainId,
                    address:address,
                    noOfReferrals: 1,
                    perDayPoints:5,
                    lastUpdatedPoints:5,
                    lastEventTime:depositedTime
                })
            }else{
                if(found.noOfReferrals == 0){
                    found.noOfReferrals += 1;
                    found.lastEventTime = depositedTime;
                    found.lastUpdatedPoints += 5
                    // found.perDayPoints = found.perDayPoints + 5;
                }

            }
            await this.pointsRepository.save(found);

        }
    }

    async setPostsInXPoints(
        address:string,
        chainId:number,
        posted:boolean,
        depositedTime:string,
    ){
        if(posted){
            let found = await this.pointsRepository.findOne({ where:{
                chainId:chainId,
                address:address}
            })
    
            if(!found){
                found = this.pointsRepository.create({
                    chainId:chainId,
                    address:address,
                    noOfPostsInX: 1,
                    perDayPoints:5,
                    lastUpdatedPoints:5,
                    lastEventTime:depositedTime
                })
            }else{
                if(found.noOfPostsInX == 0){
                    found.noOfPostsInX += 1;
                    found.lastEventTime = depositedTime;
                    found.lastUpdatedPoints += 5;
                    // found.perDayPoints = found.perDayPoints + 5;
                }

            }
            await this.pointsRepository.save(found);

        }
    }
}
