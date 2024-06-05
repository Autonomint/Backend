import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalVariables } from './entities/global.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Batch } from '../borrows/entities/batch.entity';

@Injectable()
export class GlobalService {

    constructor(
        @InjectRepository(GlobalVariables)
        private globalRepository: Repository<GlobalVariables>,
        @InjectRepository(Batch)
        private batchRepository: Repository<Batch>
    ){}

    private chainIds = [11155111,84532];

    // Set amint balance in treasury
    async setTreasuryAmintBalance(chainId:number,amintBalance:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                    chainId,
                    treasuryAmintBalance:amintBalance
            })
        }else{
            found.treasuryAmintBalance = amintBalance;
        }
        await this.globalRepository.save(found);
    }
    // Set Eth balance in treasury
    async setTreasuryEthBalance(chainId:number,ethBalance:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                    chainId,
                    treasuryEthBalance:ethBalance
            })
        }else{
            found.treasuryEthBalance = ethBalance;
        }
        await this.globalRepository.save(found);
    }
    // Set TotalCdsDepositedAmount
    async setTotalCdsDepositedAmount(chainId:number,amintAmount:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                    chainId,
                    totalCdsDepositedAmount:amintAmount
            })
        }else{
            found.totalCdsDepositedAmount = amintAmount;
        }
        await this.globalRepository.save(found);
    }
    // Set TotalBorrowDepositedETH
    async setTotalBorrowDepositedETH(chainId:number,ethAmount:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                    chainId,
                    totalBorrowDepositedETH:ethAmount
            })
        }else{
            found.totalBorrowDepositedETH = ethAmount;
        }
        await this.globalRepository.save(found);
    }
    // Set total available liquidation amount in treasury
    async setTotalAvailableLiquidationAmount(chainId:number,liquidationAmount:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                    chainId,
                    totalAvailableLiquidationAmount:liquidationAmount
            })
        }else{
            found.totalAvailableLiquidationAmount = liquidationAmount;
        }

        await this.globalRepository.save(found);
    }
    // Set liquidation index
    async setLiquidationIndex(chainId:number,liquidationIndex:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                    chainId,
                    liquidationIndex:liquidationIndex
            })
        }else{
            found.liquidationIndex = liquidationIndex;
        }
        await this.globalRepository.save(found);
    }
    // Set Eth prices
    async setEthPrice(chainId:number,ethPrice:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                    chainId,
                    lastEthPrice:ethPrice,
                    fallbackEthPrice:ethPrice
            })
        }else{
            found.lastEthPrice = ethPrice;
            found.fallbackEthPrice = found.lastEthPrice;
        }
        await this.globalRepository.save(found);
    }

    // Initiate batch number
    async setBatchNo(chainId:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                chainId,
                batchNo:1,
            })
            const newBatch = this.batchRepository.create({
                chainId,
                batchNo:1
            })
            await this.globalRepository.save(found);
            await this.batchRepository.save(newBatch);
        }else{
            return ;
        }
    }

    async setCumulativeValue(chainId:number,value:number){
        let found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            found = this.globalRepository.create({
                    chainId,
                    cumulativeValue:value
            })
        }else{
            found.cumulativeValue = value;
        }
        await this.globalRepository.save(found);
    }
    
    // Increase batch number
    @Cron('0 0 0/24 * * *',{name:'Increment Batch No'})
    // @Cron(CronExpression.EVERY_10_SECONDS,{name:'Increment Batch No'})
    async incrementBatchNo(){

        for (let i = 0;i < this.chainIds.length;i++){
            const found = await this.globalRepository.findOne({where:{chainId:this.chainIds[i]}});
            if(found){
                const newBatch = this.batchRepository.create({
                    chainId:this.chainIds[i],
                    batchNo:parseInt((found.batchNo).toString()) + 1,
                })
                found.batchNo = parseInt((found.batchNo).toString()) + 1;
                await this.batchRepository.save(newBatch);
                await this.globalRepository.save(found);
            }
        }
    }

    async updateNoOfUsers(chainId:number,operation:boolean){
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(found){
            if(operation){
                found.noOfUsers++;
            }else{
                found.noOfUsers--;
            }
            await this.globalRepository.save(found);
        }
    }

    async getNoOfUsers():Promise<number>{
        let totalUsers = 0;
        for (let i = 0;i < this.chainIds.length;i++){
            const found = await this.globalRepository.findOne({where:{chainId:this.chainIds[i]}});
            if(found){
                totalUsers += found.noOfUsers;
            }
        }
        return totalUsers; 
    }

    // Get amint balance in treasury
    async getTreasuryAmintBalance(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            return 0;
        }else{
            if(!found.treasuryAmintBalance){
                return 0;
            }else{
                return found.treasuryAmintBalance;
            }
        }
    }
    // Get Eth balance in treasury
    async getTreasuryEthBalance(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            return 0;
        }else{
            if(!found.treasuryEthBalance){
                return 0;
            }else{
                return found.treasuryEthBalance;
            }
        }
    }
    // Get TotalCdsDepositedAmount
    async getTotalCdsDepositedAmount(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            return 0;
        }else{
            if(!found.totalCdsDepositedAmount){
                return 0;
            }else{
                return found.totalCdsDepositedAmount;
            }
        }
    }
    // Get TotalBorrowDepositedETH
    async getTotalBorrowDepositedETH(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            return 0;
        }else{
            if(!found.totalBorrowDepositedETH){
                return 0;
            }else{
                return found.totalBorrowDepositedETH;
            }
        }
    }
    // Get total available liquidation amount in treasury
    async getTotalAvailableLiquidationAmount(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        return found.totalAvailableLiquidationAmount;
    }
    // Get liquidation index
    async getLiquidationIndex(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        return found.liquidationIndex;
    }
    // Get Eth prices
    async getEthPrices(chainId:number):Promise<number[]>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        return [found.fallbackEthPrice,found.lastEthPrice];
    }

    // Get batch number
    async getBatchNo(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            return 0;
        }
        return found.batchNo;
    }

    async getCumulativeValue(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        if(!found){
            return 0;
        }else{
            if(!found.cumulativeValue){
                return 0;
            }else{
                return found.cumulativeValue;
            }
        }
    }
}
