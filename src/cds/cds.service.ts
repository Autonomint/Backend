import { Inject, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { Repository,Equal } from 'typeorm';
import { AddCdsDto } from './dto/create-cds.dto';
import { CdsPositionStatus } from './cds-status.enum';
import { WithdrawCdsDto } from './dto/withdraw-cds.dto';
import { GetCdsDeposit } from './dto/get-cds-deposit.dto';
import { ethers } from 'ethers';
import { GetCdsDepositByChainId } from './dto/get-cds-deposit-by-chainid.dto';
import { CdsAmountToReturn } from './dto/cdsAmountToReturn.dto';
import { GlobalService } from '../global/global.service';
import { LiquidationInfo } from '../borrows/entities/liquidatedInfo.entity';

@Injectable()
export class CdsService {
    constructor(
        @InjectRepository(CdsInfo)
        private cdsRepository: Repository<CdsInfo>,
        @InjectRepository(CdsDepositorInfo)
        private cdsDepositorRepository: Repository<CdsDepositorInfo>,
        @InjectRepository(LiquidationInfo)
        private liquidationInfoRepository: Repository<LiquidationInfo>,
        private globalService:GlobalService
    ){}
     /**
      * Return cds deposit info
      * @param getCdsDeposit dto to get borrower's deposit based on index and chain id
      * @returns CdsInfo
      */
    async getCdsDeposit(getCdsDeposit:GetCdsDeposit):Promise<CdsInfo>{
        const{address,index,chainId} = getCdsDeposit;
        const found = await this.cdsRepository.findOne(
            {where:{
                address:address,
                chainId,
                index:index
            }});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" & index "${index}" not found`);
        }else{
            return found;
        }
    }
    /**
     * Return cds depositor's total info
     * @param address address of the depositor
     * @param chainId chainID
     * @returns Entire CdsDepositorInfo for that chainId
     */
    async getCdsDepositorByAddress(address:string,chainId:number):Promise<CdsDepositorInfo>{
        const found = await this.cdsDepositorRepository.findOne({where:{
            chainId,address}});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" not found`);
        }else{
            return found;
        }
    }
    /**
     * Return totalIndex of cds depositor
     * @param address address of the depositor
     * @param chainId chainId
     * @returns totalIndex of the depositor,a number
     */
    async getCdsDepositorIndexByAddress(address:string,chainId:number):Promise<number>{
        const found = await this.cdsDepositorRepository.findOne({where:{chainId,address}});
        if(!found){
            return 0;
        }else{
            return found.totalIndex;
        }
    }
        /**
         * Return cds deposits of the user in that particular chain
         * @param address address od the depositor
         * @param chainId chainId
         * @returns Total deposits array
         */
    async getDepositsByChainId(address:string,chainId:number):Promise<CdsInfo[]>{
        const found = await this.cdsRepository.findBy({
            address:Equal(address),
            chainId:Equal(chainId)
        })
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" & chainID "${chainId}" not found`);
        }else{
            return found;
        }
    }

    /**
     * add a position in cds
     * @param addCdsDto 
     * @returns 
     */
    async addCds(addCdsDto:AddCdsDto):Promise<CdsInfo>{
        const{
            address,
            collateralType,
            index,
            chainId,
            aprAtDeposit,
            depositedAmint,
            depositedUsdt,
            depositedTime,
            ethPriceAtDeposit,
            lockingPeriod,
            liquidationAmount,
            optedForLiquidation,
            depositVal
        } = addCdsDto;

        await this.globalService.setBatchNo(chainId);
        const currentIndex = await this.getCdsDepositorIndexByAddress(address,chainId);
        const initialLiquidationAmount = liquidationAmount.toString();
        const totalDepositedAmount = depositedAmint + depositedUsdt;
        if(currentIndex == (index-1) || currentIndex == 0){
            const cds = this.cdsRepository.create({
                address,
                collateralType,
                index,
                chainId,
                aprAtDeposit,
                depositedAmint,
                depositedUsdt,
                totalDepositedAmount,
                depositedTime,
                ethPriceAtDeposit,
                lockingPeriod,
                initialLiquidationAmount,
                liquidationAmount,
                optedForLiquidation,
                depositVal,
                status:CdsPositionStatus.DEPOSITED
            });

            let cdsDepositor = await this.cdsDepositorRepository.findOne({where:{
                chainId:chainId,
                address:address}});

            if(!cdsDepositor){
                cdsDepositor = new CdsDepositorInfo();
                cdsDepositor.chainId = chainId;
                cdsDepositor.totalDepositedAmint = parseFloat(depositedAmint);
                cdsDepositor.totalDepositedUsdt = parseFloat(depositedUsdt);
                cdsDepositor.totalDepositedAmount = parseFloat(totalDepositedAmount);
                cdsDepositor.deposits = [cds]
            }else{
                cdsDepositor.totalDepositedAmint = parseFloat(cdsDepositor.totalDepositedAmint.toString()) + parseFloat(depositedAmint);
                cdsDepositor.totalDepositedUsdt = parseFloat(cdsDepositor.totalDepositedUsdt.toString()) + parseFloat(depositedUsdt);
                cdsDepositor.totalDepositedAmount = parseFloat(cdsDepositor.totalDepositedAmount.toString()) + parseFloat(totalDepositedAmount);
                cdsDepositor.deposits.push(cds);
                // cdsDepositor.totalLiquidationAmount += parseInt(liquidationAmount);
            }
            
            cdsDepositor.totalIndex = index;
            cdsDepositor.address = address;

            //get the amint balance in treasury
            const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);

            // Update the amint balance in treasury
            if(amintBalance == 0){
                this.globalService.setTreasuryAmintBalance(chainId,parseFloat(depositedAmint)); 
            }else{
                this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) + parseFloat(depositedAmint)); 
            }
            //Update eth price
            await this.globalService.setEthPrice(chainId,ethPriceAtDeposit);
            await this.cdsRepository.save(cds);
            await this.cdsDepositorRepository.save(cdsDepositor);
            return cds;
        }else{
            throw new NotFoundException('Incorrect index');
        }
    }

    /**
     * withdraw the cds position
     * @param cdsWithdrawDto 
     * @returns 
     */
    async cdsWithdraw(cdsWithdrawDto:WithdrawCdsDto):Promise<CdsInfo>{
        const{
            address,
            index,
            chainId,
            ethPriceAtWithdraw,
            withdrawTime,
            withdrawAmount,
            withdrawEthAmount,
            fees,
            feesWithdrawn
        } = cdsWithdrawDto;

        const found = await this.cdsRepository.findOne(
            {where:{
                address:address,
                chainId:chainId,
                index:index
            }});
        const withdrawEthAmountInEther = ethers.utils.formatEther(withdrawEthAmount);
        const withdrawAmountInEther = ethers.utils.formatEther(withdrawAmount);
        const feesInEther = ethers.utils.formatEther(fees);
        const feesWithdrawnInEther = ethers.utils.formatEther(feesWithdrawn);
        const cdsDepositor = await this.cdsDepositorRepository.findOne({where:{
            chainId:chainId,
            address:address}});

        found.withdrawTime = withdrawTime;
        found.ethPriceAtWithdraw = ethPriceAtWithdraw;
        found.withdrawAmount = withdrawAmountInEther;
        found.withdrawEthAmount = withdrawEthAmountInEther;
        found.fees = feesInEther;
        if(!cdsDepositor.totalFees){
            cdsDepositor.totalFees= parseFloat(feesInEther);     
            cdsDepositor.totalFeesWithdrawn = parseFloat(feesWithdrawnInEther);      
        }else{
            cdsDepositor.totalFees = parseFloat(cdsDepositor.totalFees.toString()) + parseFloat(feesInEther);
            cdsDepositor.totalFeesWithdrawn = parseFloat(cdsDepositor.totalFeesWithdrawn.toString()) + parseFloat(feesWithdrawnInEther);  
        }
        cdsDepositor.totalDepositedAmint = parseFloat(cdsDepositor.totalDepositedAmint.toString()) - parseFloat(found.depositedAmint);
        cdsDepositor.totalDepositedUsdt = parseFloat(cdsDepositor.totalDepositedUsdt.toString()) - parseFloat(found.depositedUsdt);
        cdsDepositor.totalDepositedAmount = parseFloat(cdsDepositor.totalDepositedAmount.toString()) - parseFloat(found.totalDepositedAmount);

        found.status = CdsPositionStatus.WITHDREW;

        const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);
        const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);

        //Update the amint and eth balance in treasury
        await this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) - parseFloat(withdrawAmountInEther));
        await this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) - parseFloat(withdrawEthAmountInEther)); 
        await this.globalService.setEthPrice(chainId,ethPriceAtWithdraw);

        await this.cdsRepository.save(found);
        await this.cdsDepositorRepository.save(cdsDepositor);

        return found;
    }

    async cdsAmountToReturn(cdsAmountToReturnDto : CdsAmountToReturn):Promise<number>{
        const {address,index,chainId,ethPrice} = cdsAmountToReturnDto;
        
        let getCdsDepositDto = new GetCdsDeposit();
        getCdsDepositDto = {address,index,chainId}
        // Get the particular deposit
        const found = await this.getCdsDeposit(getCdsDepositDto);

        //Calculate the withdraw value
        const withdrawVal = await this.calculateValue(ethPrice,chainId);
        const depositVal = found.depositVal;
        if(withdrawVal <= depositVal){
            const valDiff = depositVal - withdrawVal;
            const loss = (parseFloat(found.depositedAmint) * valDiff)/1000;
            return (parseFloat(found.depositedAmint) - loss);
        }else{
            const valDiff = withdrawVal - depositVal;
            const toReturn = (parseFloat(found.depositedAmint) * valDiff)/1000;
            return (parseFloat(found.depositedAmint) + toReturn);
        }
    }

    async calculateValue(ethPrice:number,chainId:number):Promise<number>{
        const amount = 1000;
        const treasuryBal = await this.globalService.getTreasuryAmintBalance(chainId);
        const vaultBal = await this.globalService.getTreasuryEthBalance(chainId);

        let priceDiff:number;

        const ethPrices = await this.globalService.getEthPrices(chainId);

        if(ethPrice != ethPrices[1]){
            priceDiff = ethPrice - ethPrices[1];
        }else{
            priceDiff = ethPrice - ethPrices[0];
        }
        const value = (amount * vaultBal * priceDiff)/treasuryBal;
        return value;
    }

    /**
     * calculate liquidation gains,gained by user
     * @param getCdsDepositDto 
     * @returns 
     */
    async calculateLiquidationGains(getCdsDepositDto:GetCdsDeposit):Promise<[number,number]>{
        const{address,chainId,index} = getCdsDepositDto;
        //Get the particular deposit
        const found = await this.getCdsDeposit(getCdsDepositDto);
        const liquidationIndexAtDeposit = found.liquidationIndex;
        let currentLiquidations = await this.globalService.getLiquidationIndex(chainId);
        if(!currentLiquidations){
            currentLiquidations = 0;
        }
        let ethAmount:number;
        // Loop through the liquidations that happened between deposit and withdraw
        if((currentLiquidations - liquidationIndexAtDeposit) != 0){
            for(let i = liquidationIndexAtDeposit;i <= currentLiquidations;i++){
                const liquidationAmount = found.liquidationAmount;
                if(liquidationAmount > 0){
                    const liquidatedPosition = await this.liquidationInfoRepository.findOne(
                        {
                            where:{
                                chainId:chainId,
                                index:i}})
                    // Calculate the depositor's proportion in that liquidation
                    const share = (liquidationAmount/liquidatedPosition.availableLiquidationAmount)
                    let profit = liquidatedPosition.profits * share;
                    found.liquidationAmount += profit;
                    found.liquidationAmount -= (found.liquidationAmount * share)
                    ethAmount += liquidatedPosition.ethAmount * share;    
                }
            }
            return[ethAmount,found.liquidationAmount];
        }else{
            return [null,null];
        }

    }

    /**
     * returns the withdraw amount 
     * @param cdsAmountToReturnDto 
     * @returns 
     */
    async calculateWithdrawAmount(cdsAmountToReturnDto : CdsAmountToReturn):Promise<number[]>{
        const {address,index,chainId,ethPrice} = cdsAmountToReturnDto;
        let getCdsDepositDto = new GetCdsDeposit(); 
        getCdsDepositDto = {address,index,chainId}

        const found = await this.getCdsDeposit(getCdsDepositDto);
        const priceChangeGainOrLoss = await this.cdsAmountToReturn(cdsAmountToReturnDto);
        let returnAmounts:number[];
        // If user opted for liquidation calculate liquidation gains
        if(found.optedForLiquidation == true){
            const liquidationGains = await this.calculateLiquidationGains(getCdsDepositDto);
            if(!liquidationGains){
                const depositedAmintWithoutLiquidationAmount = parseFloat(found.depositedAmint) - parseFloat(found.initialLiquidationAmount);
                returnAmounts = [(depositedAmintWithoutLiquidationAmount + priceChangeGainOrLoss + liquidationGains[1] - 2*(parseFloat(found.depositedAmint))),liquidationGains[0]];
            }else{
                returnAmounts = [priceChangeGainOrLoss];
            }
        }else{
            returnAmounts = [priceChangeGainOrLoss];
        }
        return returnAmounts;
    }
}
