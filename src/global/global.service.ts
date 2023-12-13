import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalVariables } from './entities/global.entity';

@Injectable()
export class GlobalService {

    constructor(
        @InjectRepository(GlobalVariables)
        private globalVariables:GlobalVariables
    ){}

    async setTreasuryAmintBalance(chainId:number,amintBalance:number){
        if(chainId == 1115511){
            this.globalVariables.treasuryAmintBalanceEthereum = amintBalance;
        }else if(chainId == 80001){
            this.globalVariables.treasuryAmintBalancePolygon = amintBalance;
        }
    }

    async setTreasuryEthBalance(chainId:number,ethBalance:number){
        if(chainId == 1115511){
            this.globalVariables.treasuryEthBalanceEthereum = ethBalance;
        }else if(chainId == 80001){
            this.globalVariables.treasuryEthBalancePolygon = ethBalance;
        }
    }

    async setTotalAvailableLiquidationAmount(chainId:number,liquidationAmount:number){
        if(chainId == 1115511){
            this.globalVariables.totalAvailableLiquidationAmountInEthereum = liquidationAmount;
        }else if(chainId == 80001){
            this.globalVariables.totalAvailableLiquidationAmountInPolygon = liquidationAmount;
        }
    }

    async setLiquidationIndex(chainId:number,liquidationIndex:number){
        if(chainId == 1115511){
            this.globalVariables.liquidationIndexInEthereum = liquidationIndex;
        }else if(chainId == 80001){
            this.globalVariables.liquidationIndexInPolygon = liquidationIndex;
        }
    }



    async getTreasuryAmintBalance(chainId:number):Promise<any>{
        if(chainId == 1115511){
            return this.globalVariables.treasuryAmintBalanceEthereum;
        }else if(chainId == 80001){
            return this.globalVariables.treasuryAmintBalancePolygon;
        }
    }

    async getTreasuryEthBalance(chainId:number):Promise<any>{
        if(chainId == 1115511){
            return this.globalVariables.treasuryEthBalanceEthereum;
        }else if(chainId == 80001){
            return this.globalVariables.treasuryEthBalancePolygon;
        }
    }

    async getTotalAvailableLiquidationAmount(chainId:number):Promise<any>{
        if(chainId == 1115511){
            return this.globalVariables.totalAvailableLiquidationAmountInEthereum;
        }else if(chainId == 80001){
            return this.globalVariables.totalAvailableLiquidationAmountInPolygon;
        }
    }

    async getLiquidationIndex(chainId:number):Promise<any>{
        if(chainId == 1115511){
            return this.globalVariables.liquidationIndexInEthereum;
        }else if(chainId == 80001){
            return this.globalVariables.liquidationIndexInPolygon;
        }
    }

}
