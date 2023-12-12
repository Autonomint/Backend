import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalVariables } from './entities/global.entity';

@Injectable()
export class GlobalService {

    constructor(
        @InjectRepository(GlobalVariables)
        private globalVariables:GlobalVariables
    ){}

    async setTreasuryAmintBalanceEthereum(amintBalance:number){
        this.globalVariables.treasuryAmintBalanceEthereum = amintBalance;
    }

    async setTreasuryAmintBalancePolygon(amintBalance:number){
        this.globalVariables.treasuryAmintBalancePolygon = amintBalance;       
    }

    async setTreasuryEthBalanceEthereum(ethBalance:number){
        this.globalVariables.treasuryEthBalanceEthereum = ethBalance;

    }

    async setTreasuryEthBalancePolygon(ethBalance:number){
        this.globalVariables.treasuryEthBalancePolygon = ethBalance;
    }

    async setTotalAvailableLiquidationAmountInEthereum(liquidationAmount:number){
        this.globalVariables.totalAvailableLiquidationAmountInEthereum = liquidationAmount;
    }

    async setTotalAvailableLiquidationAmountInPolygon(liquidationAmount:number){
        this.globalVariables.totalAvailableLiquidationAmountInPolygon = liquidationAmount;
    }

    async setLiquidationIndexInEthereum(liquidationIndex:number){
        this.globalVariables.liquidationIndexInEthereum = liquidationIndex;
    }

    async setLiquidationIndexInPolygon(liquidationIndex:number){
        this.globalVariables.liquidationIndexInPolygon = liquidationIndex;
    }
    
    async getTreasuryAmintBalanceEthereum():Promise<any>{
        return this.globalVariables.treasuryAmintBalanceEthereum;
    }
    async getTreasuryAmintBalancePolygon():Promise<any>{
        return this.globalVariables.treasuryAmintBalancePolygon;       
    }
    async getTreasuryEthBalanceEthereum():Promise<any>{
        return this.globalVariables.treasuryEthBalanceEthereum;

    }
    async getTreasuryEthBalancePolygon():Promise<any>{
        return this.globalVariables.treasuryEthBalancePolygon;
    }

    async getTotalAvailableLiquidationAmountInEthereum():Promise<any>{
        return this.globalVariables.totalAvailableLiquidationAmountInEthereum;
    }

    async getTotalAvailableLiquidationAmountInPolygon():Promise<any>{
        return this.globalVariables.totalAvailableLiquidationAmountInPolygon;
    }

    async getLiquidationIndexInEthereum():Promise<any>{
        return this.globalVariables.liquidationIndexInEthereum;
    }

    async getLiquidationIndexInPolygon():Promise<any>{
        return this.globalVariables.liquidationIndexInPolygon;
    }



}
