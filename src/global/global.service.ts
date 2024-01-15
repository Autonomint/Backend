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
                    fallbackEthPrice:0
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
    
    // Increase batch number
    @Cron('0 0 0/24 * * *',{name:'Increment Batch No'})
    // @Cron("*/4 * * * * *",{name:'Increment Batch No'})
    async incrementBatchNo(){
        const foundMumbai = await this.globalRepository.findOne({where:{chainId:80001}});
        const foundSepolia = await this.globalRepository.findOne({where:{chainId:11155111}});

        if(foundMumbai){
            const newBatchMumbai = this.batchRepository.create({
                chainId:80001,
                batchNo:parseInt((foundMumbai.batchNo).toString()) + 1,
            })
            foundMumbai.batchNo = parseInt((foundMumbai.batchNo).toString()) + 1;
            await this.batchRepository.save(newBatchMumbai);
            await this.globalRepository.save(foundMumbai);
        }
        if(foundSepolia){
            const newBatchSepolia = this.batchRepository.create({
                chainId:11155111,
                batchNo:parseInt((foundSepolia.batchNo).toString()) + 1,
            })
            foundSepolia.batchNo = parseInt((foundSepolia.batchNo).toString()) + 1;
            await this.batchRepository.save(newBatchSepolia);
            await this.globalRepository.save(foundSepolia);
        }
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
}
