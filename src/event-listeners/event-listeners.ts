import { Inject } from '@nestjs/common';
import { BorrowsService } from '../borrows/borrows.service';
import { CdsService } from '../cds/cds.service';
import { PointsService } from '../points/points.service';
import { Contract,ethers } from 'ethers';
import {
    borrowAddressSepolia,borrowAddressBaseSepolia,
    cdsAddressSepolia,cdsAddressBaseSepolia,
    treasuryAddressSepolia,treasuryAddressBaseSepolia,
    optionsAddressSepolia,optionsAddressBaseSepolia,
    poolAddressSepolia,usdaAddressModeSepolia,
    borrowABI,cdsABI,treasuryABI,optionsABI,poolABI,usdaABI,
    eidSepolia,eidBaseSepolia

} from '../utils/index';
import { AddCdsDto } from '../cds/dto/create-cds.dto';
import { WithdrawCdsDto } from '../cds/dto/withdraw-cds.dto';
import { AddBorrowDto } from '../borrows/dto/create-borrow.dto';
import { WithdrawDto } from '../borrows/dto/withdraw.dto';

export class EventListeners{
    
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

      
/**
 * Listens for the 'Deposit' event on the borrowingContractSepolia contract.
 * When the event is triggered, it constructs an AddBorrowDto object with the event parameters
 * and calls the borrowService.addBorrow method with the constructed object.
 *
 * @param address - The address of the depositor.
 * @param index - The index of the deposit.
 * @param depositedAmount - The amount deposited.
 * @param normalizedAmount - The normalized amount of the deposit.
 * @param depositedTime - The time the deposit was made.
 * @param ethPrice - The price of ETH at the time of deposit.
 * @param noOfAmintMinted - The number of AMINT minted.
 * @param strikePrice - The strike price of the deposit.
 * @param optionFees - The fees for the option.
 * @param strikePricePercent - The strike price percent of the deposit.
 * @param apr - APR at deposit
 */
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
            strikePricePercent,
            apr) => {

            let result:AddBorrowDto
            const strikePriceIndex = Number(strikePricePercent);

            strikePricePercent = strikePriceIndex == 0 ? 'FIVE' : strikePriceIndex == 1 ? 'TEN' : strikePriceIndex == 2 ? 'FIFTEEN' :
                                    strikePriceIndex == 3 ? 'TWENTY' : 'TWENTY_FIVE';
            result = {            
                address,
                chainId:11155111,
                collateralType: 'ETH',
                index:Number(index),
                downsideProtectionPercentage:20,
                aprAtDeposit:Number(apr)/10,
                depositedAmount:ethers.formatEther(depositedAmount),
                normalizedAmount:(Number(normalizedAmount)/1e6).toString(),
                depositedTime:Number(depositedTime).toString(),
                ethPrice:Number(ethPrice),
                noOfAmintMinted:Number(noOfAmintMinted).toString(),
                strikePrice:Number(strikePrice),
                optionFees:Number(optionFees).toString(),
                strikePricePercent
            };
            await borrowService.addBorrow(result);
        })


        /**
 * Listens for the 'Deposit' event on the cdsContractSepolia contract.
 * When the event is triggered, it constructs an AddCdsDto object with the event parameters
 * and calls the cdsService.addCds method with the constructed object.
 *
 * @param address - The address of the depositor.
 * @param index - The index of the deposit.
 * @param depositedAmint - The amount of AMINT deposited.
 * @param depositedUsdt - The amount of USDT deposited.
 * @param depositedTime - The time the deposit was made.
 * @param ethPriceAtDeposit - The price of ETH at the time of deposit.
 * @param lockingPeriod - The locking period of the deposit.
 * @param liquidationAmount - The liquidation amount of the deposit.
 * @param optedForLiquidation - Whether the depositor opted for liquidation.
 */
        cdsContractSepolia.on('Deposit',async (            
            address,
            index,
            depositedAmint,
            depositedUsdt,
            depositedTime,
            ethPriceAtDeposit,
            lockingPeriod,
            liquidationAmount,
            optedForLiquidation) => {
            
            let collateralType:string;
            let result:AddCdsDto;

            if(depositedAmint > 0 && depositedUsdt > 0){
                collateralType = 'USDA&USDT'
            }else if(depositedAmint > 0 && depositedUsdt <= 0){
                collateralType = 'USDA'
            }else if(depositedAmint <= 0 && depositedUsdt > 0){
                collateralType = 'USDT'
            }
            result = {            
                address,
                chainId:11155111,
                collateralType,
                index: Number(index),
                aprAtDeposit:5,
                depositedAmint:(Number(depositedAmint)/1e6).toString(),
                depositedUsdt:(Number(depositedUsdt)/1e6).toString(),
                depositedTime:Number(depositedTime).toString(),
                ethPriceAtDeposit:Number(ethPriceAtDeposit),
                lockingPeriod:Number(lockingPeriod),
                optedForLiquidation,
                liquidationAmount:Number(liquidationAmount)
                };

            await cdsService.addCds(result);

        })

/**
 * Listens for the 'Deposit' event on the borrowingContractBaseSepolia contract.
 * When the event is triggered, it constructs an AddBorrowDto object with the event parameters
 * and calls the borrowService.addBorrow method with the constructed object.
 *
 * @param address - The address of the depositor.
 * @param index - The index of the deposit.
 * @param depositedAmount - The amount deposited.
 * @param normalizedAmount - The normalized amount of the deposit.
 * @param depositedTime - The time the deposit was made.
 * @param ethPrice - The price of ETH at the time of deposit.
 * @param noOfAmintMinted - The number of AMINT minted.
 * @param strikePrice - The strike price of the deposit.
 * @param optionFees - The fees for the option.
 * @param strikePricePercent - The strike price percent of the deposit.
 * @param apr - APR at deposit
 */

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
            strikePricePercent,
            apr) => {

            let result:AddBorrowDto
            const strikePriceIndex = Number(strikePricePercent);

            strikePricePercent = strikePriceIndex == 0 ? 'FIVE' : strikePriceIndex == 1 ? 'TEN' : strikePriceIndex == 2 ? 'FIFTEEN' :
                                    strikePriceIndex == 3 ? 'TWENTY' : 'TWENTY_FIVE';
            result = {            
                address,
                chainId:84532,
                collateralType: 'BASE',
                index:Number(index),
                downsideProtectionPercentage:20,
                aprAtDeposit:Number(apr)/10,
                depositedAmount:ethers.formatEther(depositedAmount),
                normalizedAmount:(Number(normalizedAmount)/1e6).toString(),
                depositedTime:Number(depositedTime).toString(),
                ethPrice:Number(ethPrice),
                noOfAmintMinted:Number(noOfAmintMinted).toString(),
                strikePrice:Number(strikePrice),
                optionFees:Number(optionFees).toString(),
                strikePricePercent
            };
            await borrowService.addBorrow(result);
        })

/**
 * Listens for the 'Deposit' event on the cdsContractBaseSepolia contract.
 * When the event is triggered, it constructs an AddCdsDto object with the event parameters
 * and calls the cdsService.addCds method with the constructed object.
 *
 * @param address - The address of the depositor.
 * @param index - The index of the deposit.
 * @param depositedAmint - The amount of AMINT deposited.
 * @param depositedUsdt - The amount of USDT deposited.
 * @param depositedTime - The time the deposit was made.
 * @param ethPriceAtDeposit - The price of ETH at the time of deposit.
 * @param lockingPeriod - The locking period of the deposit.
 * @param liquidationAmount - The liquidation amount of the deposit.
 * @param optedForLiquidation - Whether the depositor opted for liquidation.
 */
        cdsContractBaseSepolia.on('Deposit',async (            
            address,
            index,
            depositedAmint,
            depositedUsdt,
            depositedTime,
            ethPriceAtDeposit,
            lockingPeriod,
            liquidationAmount,
            optedForLiquidation) => {
            
            let collateralType:string;
            let result:AddCdsDto;

            if(depositedAmint > 0 && depositedUsdt > 0){
                collateralType = 'USDA&USDT'
            }else if(depositedAmint > 0 && depositedUsdt <= 0){
                collateralType = 'USDA'
            }else if(depositedAmint <= 0 && depositedUsdt > 0){
                collateralType = 'USDT'
            }
            result = {            
                address,
                chainId:84532,
                collateralType,
                index: Number(index),
                aprAtDeposit:5,
                depositedAmint:(Number(depositedAmint)/1e6).toString(),
                depositedUsdt:(Number(depositedUsdt)/1e6).toString(),
                depositedTime:Number(depositedTime).toString(),
                ethPriceAtDeposit:Number(ethPriceAtDeposit),
                lockingPeriod:Number(lockingPeriod),
                optedForLiquidation,
                liquidationAmount:Number(liquidationAmount)
                };

            await cdsService.addCds(result);
        })


/**
 * Listens for the 'Withdraw' event on the borrowingContractSepolia contract.
 * When the event is triggered, it constructs a WithdrawDto object with the event parameters
 * and calls the borrowService.withdraw method with the constructed object.
 *
 * @param address - The address of the borrower.
 * @param index - The index of the withdrawal.
 * @param withdrawTime - The time the withdrawal was made.
 * @param withdrawAmount - The amount withdrawn.
 * @param noOfAbond - The number of ABOND withdrawn.
 * @param totalDebtAmount - The total debt amount after the withdrawal.
 */
        borrowingContractSepolia.on('Withdraw',async (            
            address,
            index,
            withdrawTime,
            withdrawAmount,
            noOfAbond,
            totalDebtAmount) => {

            let result:WithdrawDto
            result = {            
                address,
                chainId:11155111,
                index:Number(index),
                withdrawTime:Number(withdrawTime).toString(),
                withdrawAmount:Number(withdrawAmount).toString(),
                noOfAbond:Number(noOfAbond).toString(),
                totalDebtAmount:Number(totalDebtAmount).toString()
            };
            await borrowService.withdraw(result);
        })

/**
 * Listens for the 'Withdraw' event on the cdsContractSepolia contract.
 * When the event is triggered, it constructs a WithdrawCdsDto object with the event parameters
 * and calls the cdsService.cdsWithdraw method with the constructed object.
 *
 * @param address - The address of the borrower.
 * @param index - The index of the withdrawal.
 * @param ethPriceAtWithdraw - The price of ETH at the time of withdrawal.
 * @param withdrawTime - The time the withdrawal was made.
 * @param withdrawAmount - The amount withdrawn.
 * @param withdrawEthAmount - The amount of ETH withdrawn.
 * @param fees - The fees for the withdrawal.
 * @param feesWithdrawn - The fees withdrawn.
 */

        cdsContractSepolia.on('Withdraw',async (            
            address,
            index,
            ethPriceAtWithdraw,
            withdrawTime,
            withdrawAmount,
            withdrawEthAmount,
            fees,
            feesWithdrawn) => {

            let result:WithdrawCdsDto;
            result = {            
                address,
                chainId:11155111,
                index:Number(index),
                withdrawAmount:Number(withdrawAmount).toString(),
                withdrawTime:Number(withdrawTime).toString(),
                withdrawEthAmount:Number(withdrawEthAmount).toString(),
                ethPriceAtWithdraw:Number(ethPriceAtWithdraw),
                fees:Number(fees).toString(),
                feesWithdrawn:Number(feesWithdrawn).toString()};
            await cdsService.cdsWithdraw(result);
        })

/**
 * Listens for the 'Withdraw' event on the borrowingContractBaseSepolia contract.
 * When the event is triggered, it constructs a WithdrawDto object with the event parameters
 * and calls the borrowService.withdraw method with the constructed object.
 *
 * @param address - The address of the borrower.
 * @param index - The index of the withdrawal.
 * @param withdrawTime - The time the withdrawal was made.
 * @param withdrawAmount - The amount withdrawn.
 * @param noOfAbond - The number of ABOND withdrawn.
 * @param totalDebtAmount - The total debt amount after the withdrawal.
 */
        borrowingContractBaseSepolia.on('Withdraw',async (
            address,
            index,
            withdrawTime,
            withdrawAmount,
            noOfAbond,
            totalDebtAmount) => {

            let result:WithdrawDto
            result = {            
                address,
                chainId:84532,
                index:Number(index),
                withdrawTime:Number(withdrawTime).toString(),
                withdrawAmount:Number(withdrawAmount).toString(),
                noOfAbond:Number(noOfAbond).toString(),
                totalDebtAmount:Number(totalDebtAmount).toString()
            };
            await borrowService.withdraw(result);
        })

/**
 * Listens for the 'Withdraw' event on the cdsContractBaseSepolia contract.
 * When the event is triggered, it constructs a WithdrawCdsDto object with the event parameters
 * and calls the cdsService.cdsWithdraw method with the constructed object.
 *
 * @param address - The address of the borrower.
 * @param index - The index of the withdrawal.
 * @param ethPriceAtWithdraw - The price of ETH at the time of withdrawal.
 * @param withdrawTime - The time the withdrawal was made.
 * @param withdrawAmount - The amount withdrawn.
 * @param withdrawEthAmount - The amount of ETH withdrawn.
 * @param fees - The fees for the withdrawal.
 * @param feesWithdrawn - The fees withdrawn.
 */
        cdsContractBaseSepolia.on('Withdraw',async (            
            address,
            index,
            ethPriceAtWithdraw,
            withdrawTime,
            withdrawAmount,
            withdrawEthAmount,
            fees,
            feesWithdrawn) => {

            let result:WithdrawCdsDto;
            result = {            
                address,
                chainId:84532,
                index:Number(index),
                withdrawAmount:Number(withdrawAmount).toString(),
                withdrawTime:Number(withdrawTime).toString(),
                withdrawEthAmount:Number(withdrawEthAmount).toString(),
                ethPriceAtWithdraw:Number(ethPriceAtWithdraw),
                fees:Number(fees).toString(),
                feesWithdrawn:Number(feesWithdrawn).toString()};
            await cdsService.cdsWithdraw(result);
        })
        /**
 * Listens for the 'OFTReceived' event on the usdaContractMode contract.
 * When the event is triggered, it calls the pointsService.setUSDaBridgeToModePoints method with the appropriate parameters.
 *
 * @param guid - The unique identifier of the transaction.
 * @param srcEid - The source EID of the transaction.
 * @param toAddress - The address to which the OFT was received.
 * @param amountReceivedLD - The amount of LD received.
 */
        usdaContractMode.on('OFTReceived',async(guid,srcEid,toAddress,amountReceivedLD) => {
            await this.pointsService.setUSDaBridgeToModePoints(toAddress,919,Number(amountReceivedLD).toString(),Date.now().toString())
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
