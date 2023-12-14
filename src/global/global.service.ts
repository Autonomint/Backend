import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalVariables } from './entities/global.entity';

@Injectable()
export class GlobalService {

    constructor(
        @InjectRepository(GlobalVariables)
        private globalRepository: Repository<GlobalVariables>
    ){}

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

    async getTotalAvailableLiquidationAmount(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        return found.totalAvailableLiquidationAmount;
    }

    async getLiquidationIndex(chainId:number):Promise<number>{
        const found = await this.globalRepository.findOne({where:{chainId:chainId}});
        return found.liquidationIndex;
    }
}
