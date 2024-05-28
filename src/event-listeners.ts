import { Inject, Injectable } from '@nestjs/common';
import { BorrowsService } from './borrows/borrows.service';
import { CdsService } from './cds/cds.service';
import { PointsService } from './points/points.service';
import { Contract,ethers } from 'ethers';
import {
    borrowAddressSepolia,borrowAddressBaseSepolia,
    cdsAddressSepolia,cdsAddressBaseSepolia,
    treasuryAddressSepolia,treasuryAddressBaseSepolia,
    optionsAddressSepolia,optionsAddressBaseSepolia,
    poolAddressSepolia,usdaAddressModeSepolia,
    borrowABI,cdsABI,treasuryABI,optionsABI,poolABI,usdaABI,
    eidSepolia,eidBaseSepolia

} from './utils/index';

@Injectable()
export class EventListenersService {
    
    constructor(
        @Inject(BorrowsService)
        private borrowService:BorrowsService,
        @Inject(CdsService)
        private cdsService:CdsService,
        @Inject(PointsService)
        private pointsService:PointsService
    ){

        let borrowingContractSepolia: Contract;
        let cdsContractSepolia: Contract;
        let borrowingContractBaseSepolia: Contract;
        let cdsContractBaseSepolia: Contract;
        let usdaContractMode:Contract

        const providerSepolia = this.getProvider(11155111);
        borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABI,providerSepolia);
        cdsContractSepolia = new ethers.Contract(cdsAddressSepolia,cdsABI,providerSepolia);;

        const providerBaseSepolia = this.getProvider(84532);
        borrowingContractBaseSepolia = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,providerBaseSepolia);
        cdsContractBaseSepolia = new ethers.Contract(cdsAddressBaseSepolia,cdsABI,providerBaseSepolia);

        const providerMode = this.getProvider(919);
        usdaContractMode = new ethers.Contract(usdaAddressModeSepolia,usdaABI,providerMode);

        let result:any;

        borrowingContractSepolia.on('Deposit',async (            
            address,
            index,
            depositedAmount,
            normalizedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            optionFees,
            strikePricePercent) => {
            result = {            
                address,
                chainId:11155111,
                collateralType: 'ETH',
                index,
                downsideProtectionPercentage:20,
                aprAtDeposit:5,
                depositedAmount,
                normalizedAmount,
                depositedTime,
                ethPrice,
                noOfAmintMinted,
                strikePrice,
                optionFees,
                strikePricePercent
            };
            await borrowService.addBorrow(result);
        })

        cdsContractSepolia.on('Deposit',async (            
            address,
            index,
            depositedAmint,
            depositedUsdt,
            depositedTime,
            ethPriceAtDeposit,
            lockingPeriod,
            liquidationAmount,
            optedForLiquidation,
            depositVal) => {
            
            let collateralType:string;

            if(depositedAmint > 0 && depositedUsdt > 0){
                collateralType = 'USDA&USDT'
            }else if(depositedAmint > 0 && depositedUsdt <= 0){
                collateralType = 'USDA'
            }else if(depositedAmint <= 0 && depositedUsdt > 0){
                collateralType = 'USDT'
            }
            result = {            
                address,
                collateralType,
                index,
                chainId:11155111,
                aprAtDeposit:5,
                depositedAmint,
                depositedUsdt,
                depositedTime,
                ethPriceAtDeposit,
                lockingPeriod,
                liquidationAmount,
                optedForLiquidation,
                depositVal};
            await cdsService.addCds(result);

        })

        borrowingContractBaseSepolia.on('Deposit',async (
            address,
            index,
            depositedAmount,
            normalizedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            optionFees,
            strikePricePercent) => {
            result = {            
                address,
                chainId:84532,
                collateralType: 'BASE',
                index,
                downsideProtectionPercentage:20,
                aprAtDeposit:5,
                depositedAmount,
                normalizedAmount,
                depositedTime,
                ethPrice,
                noOfAmintMinted,
                strikePrice,
                optionFees,
                strikePricePercent
            };
            await borrowService.addBorrow(result);
        })

        cdsContractBaseSepolia.on('Deposit',async (            
            address,
            index,
            depositedAmint,
            depositedUsdt,
            depositedTime,
            ethPriceAtDeposit,
            lockingPeriod,
            liquidationAmount,
            optedForLiquidation,
            depositVal) => {
            
            let collateralType:string;

            if(depositedAmint > 0 && depositedUsdt > 0){
                collateralType = 'USDA&USDT'
            }else if(depositedAmint > 0 && depositedUsdt <= 0){
                collateralType = 'USDA'
            }else if(depositedAmint <= 0 && depositedUsdt > 0){
                collateralType = 'USDT'
            }
            result = {            
                address,
                collateralType,
                index,
                chainId:84532,
                aprAtDeposit:5,
                depositedAmint,
                depositedUsdt,
                depositedTime,
                ethPriceAtDeposit,
                lockingPeriod,
                liquidationAmount,
                optedForLiquidation,
                depositVal};
            await cdsService.addCds(result);
        })

        borrowingContractSepolia.on('Withdraw',async (            
            address,
            index,
            withdrawTime,
            withdrawAmount,
            noOfAbond,
            totalDebtAmount) => {
            result = {            
                address,
                chainId:11155111,
                index,
                withdrawTime,
                withdrawAmount,
                noOfAbond,
                totalDebtAmount
            };
            await borrowService.withdraw(result);
        })

        cdsContractSepolia.on('Withdraw',async (            
            address,
            index,
            ethPriceAtWithdraw,
            withdrawTime,
            withdrawAmount,
            withdrawEthAmount,
            fees,
            feesWithdrawn) => {
            result = {            
                address,
                index,
                chainId:11155111,
                ethPriceAtWithdraw,
                withdrawTime,
                withdrawAmount,
                withdrawEthAmount,
                fees,
                feesWithdrawn};
            await cdsService.cdsWithdraw(result);
        })

        borrowingContractBaseSepolia.on('Withdraw',async (
            address,
            index,
            withdrawTime,
            withdrawAmount,
            noOfAbond,
            totalDebtAmount) => {
            result = {            
                address,
                chainId:84532,
                index,
                withdrawTime,
                withdrawAmount,
                noOfAbond,
                totalDebtAmount
            };
            await borrowService.withdraw(result);
        })

        cdsContractBaseSepolia.on('Withdraw',async (            
            address,
            index,
            ethPriceAtWithdraw,
            withdrawTime,
            withdrawAmount,
            withdrawEthAmount,
            fees,
            feesWithdrawn) => {
            result = {            
                address,
                index,
                chainId:84532,
                ethPriceAtWithdraw,
                withdrawTime,
                withdrawAmount,
                withdrawEthAmount,
                fees,
                feesWithdrawn};
            await cdsService.cdsWithdraw(result);
        })
        
        usdaContractMode.on('OFTReceived',async(guid,srcEid,toAddress,amountReceivedLD) => {
            result = [guid,srcEid,toAddress,amountReceivedLD];
            await this.pointsService.setUSDaBridgeToModePoints(toAddress,919,amountReceivedLD,Date.now().toString())
        })
    }

    getProvider(chainId:number){
        let rpcUrl:string;
        if(chainId == 11155111){
            rpcUrl = "https://sepolia.infura.io/v3/e9cf275f1ddc4b81aa62c5aa0b11ac0f"
        }else if(chainId == 84532){
            rpcUrl = "https://base-sepolia.g.alchemy.com/v2/0-Lgk-tQKxb3V75IGadDVifTUua8H0W2"
        }else if(chainId == 919){
            rpcUrl = "https://sepolia.mode.network/" 
        }
        const provider =  new ethers.JsonRpcProvider(rpcUrl);
        return provider;
    };
}
