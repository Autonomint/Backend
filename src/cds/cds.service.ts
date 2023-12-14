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

    async getCdsDepositorByAddress(address:string):Promise<CdsDepositorInfo>{
        const found = await this.cdsDepositorRepository.findOne({where:{address}});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" not found`);
        }else{
            return found;
        }
    }

    async getCdsDepositorIndexByAddress(address:string,chainId:number):Promise<number>{
        const found = await this.cdsDepositorRepository.findOne({where:{address}});
        if(!found){
            return 0;
        }else{
            if(chainId == 11155111){
                return found.totalIndexInEthereum ? found.totalIndexInEthereum : 0;
            }else if(chainId == 80001){
                return found.totalIndexInPolygon ? found.totalIndexInPolygon : 0;
            }
        }
    }

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

    async addCds(addCdsDto:AddCdsDto):Promise<CdsInfo>{
        const{
            address,
            index,
            chainId,
            aprAtDeposit,
            depositedAmint,
            depositedTime,
            ethPriceAtDeposit,
            lockingPeriod,
            liquidationAmount,
            optedForLiquidation,
            depositVal
        } = addCdsDto;

        const currentIndex = await this.getCdsDepositorIndexByAddress(address,chainId);
        const initialLiquidationAmount = liquidationAmount.toString();
        if(currentIndex == (index-1) || currentIndex == 0){
            const cds = this.cdsRepository.create({
                address,
                index,
                chainId,
                aprAtDeposit,
                depositedAmint,
                depositedTime,
                ethPriceAtDeposit,
                lockingPeriod,
                initialLiquidationAmount,
                liquidationAmount,
                optedForLiquidation,
                depositVal,
                status:CdsPositionStatus.DEPOSITED
            });

            let cdsDepositor = await this.cdsDepositorRepository.findOne({where:{address}});

            if(!cdsDepositor){
                cdsDepositor = new CdsDepositorInfo();
                if(chainId == 11155111){
                    cdsDepositor.totalDepositedAmintInEthereum = parseFloat(depositedAmint);
                    cdsDepositor.totalIndexInEthereum = index;
                }else if(chainId == 80001){
                    cdsDepositor.totalDepositedAmintInPolygon = parseFloat(depositedAmint);
                    cdsDepositor.totalIndexInPolygon = index;
                }
                cdsDepositor.deposits = [cds]
            }else{
                if(chainId == 11155111){
                    if(cdsDepositor.totalIndexInEthereum > 0){
                        cdsDepositor.totalDepositedAmintInEthereum = parseFloat(cdsDepositor.totalDepositedAmintInEthereum.toString()) + parseFloat(depositedAmint);
                    }else{
                        cdsDepositor.totalDepositedAmintInEthereum = parseFloat(depositedAmint);
                    }
                    cdsDepositor.totalIndexInEthereum = index;
                }else if(chainId == 80001){
                    if(cdsDepositor.totalIndexInPolygon > 0){
                        cdsDepositor.totalDepositedAmintInPolygon = parseFloat(cdsDepositor.totalDepositedAmintInPolygon.toString()) + parseFloat(depositedAmint);
                    }else{
                        cdsDepositor.totalDepositedAmintInPolygon = parseFloat(depositedAmint);
                    }
                    cdsDepositor.totalIndexInPolygon = index;
                }
                cdsDepositor.deposits.push(cds);
                // cdsDepositor.totalLiquidationAmount += parseInt(liquidationAmount);
            }
            cdsDepositor.address = address;

            const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);

            if(amintBalance == 0){
                this.globalService.setTreasuryAmintBalance(chainId,parseFloat(depositedAmint)); 
            }else{
                this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) + parseFloat(depositedAmint)); 
            }
            await this.globalService.setEthPrice(chainId,ethPriceAtDeposit);
            await this.cdsRepository.save(cds);
            await this.cdsDepositorRepository.save(cdsDepositor);
            return cds;
        }else{
            return ;
        }
    }

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
        const cdsDepositor = await this.cdsDepositorRepository.findOne({where:{address:address}});

        found.withdrawTime = withdrawTime;
        found.ethPriceAtWithdraw = ethPriceAtWithdraw;
        found.withdrawAmount = withdrawAmountInEther;
        found.withdrawEthAmount = withdrawEthAmountInEther;
        found.fees = feesInEther;
        if(chainId == 11155111){
            cdsDepositor.totalDepositedAmintInEthereum = parseFloat(cdsDepositor.totalDepositedAmintInEthereum.toString()) - parseFloat(found.depositedAmint);
            if(!cdsDepositor.totalFeesInEthereum){
                cdsDepositor.totalFeesInEthereum = parseFloat(feesInEther);     
                cdsDepositor.totalFeesWithdrawnInEthereum = parseFloat(feesWithdrawnInEther);      
            }else{
                cdsDepositor.totalFeesInEthereum = parseFloat(cdsDepositor.totalFeesInEthereum.toString()) + parseFloat(feesInEther);
                cdsDepositor.totalFeesWithdrawnInEthereum = parseFloat(cdsDepositor.totalFeesWithdrawnInEthereum.toString()) + parseFloat(feesWithdrawnInEther);  
            } 
        }else if(chainId == 80001){
            cdsDepositor.totalDepositedAmintInPolygon = parseFloat(cdsDepositor.totalDepositedAmintInPolygon.toString()) - parseFloat(found.depositedAmint);
            if(!cdsDepositor.totalFeesInPolygon){
                cdsDepositor.totalFeesInPolygon = parseFloat(feesInEther);     
                cdsDepositor.totalFeesWithdrawnInPolygon = parseFloat(feesWithdrawnInEther);      
            }else{
                cdsDepositor.totalFeesInPolygon = parseFloat(cdsDepositor.totalFeesInPolygon.toString()) + parseFloat(feesInEther);
                cdsDepositor.totalFeesWithdrawnInPolygon = parseFloat(cdsDepositor.totalFeesWithdrawnInPolygon.toString()) + parseFloat(feesWithdrawnInEther);  
            }
        }

        found.status = CdsPositionStatus.WITHDREW;

        const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);
        const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);

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
        const found = await this.getCdsDeposit(getCdsDepositDto);
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

    async calculateLiquidationGains(getCdsDepositDto:GetCdsDeposit):Promise<[number,number]>{
        const{address,chainId,index} = getCdsDepositDto;
        const found = await this.getCdsDeposit(getCdsDepositDto);
        const liquidationIndexAtDeposit = found.liquidationIndex;
        let currentLiquidations = await this.globalService.getLiquidationIndex(chainId);
        if(!currentLiquidations){
            currentLiquidations = 0;
        }
        let ethAmount:number;
        if((currentLiquidations - liquidationIndexAtDeposit) != 0){
            for(let i = liquidationIndexAtDeposit;i <= currentLiquidations;i++){
                const liquidationAmount = found.liquidationAmount;
                if(liquidationAmount > 0){
                     const liquidatedPosition = await this.liquidationInfoRepository.findOne(
                         {
                             where:{
                                 chainId:chainId,
                                 index:i}})
                     const share = (liquidationAmount/liquidatedPosition.availableLiquidationAmount)
                     let profit = liquidatedPosition.profits * share;
                     found.liquidationAmount += profit;
                     found.liquidationAmount -= (found.liquidationAmount * share)
                     ethAmount += liquidatedPosition.ethAmount * share;    
                 }
             }
             return[ethAmount,found.liquidationAmount];
        }else{
            throw new NotFoundException(`No Liquidations happened between deposit and withdraw`);
        }

    }

    async calculateWithdrawAmount(cdsAmountToReturnDto : CdsAmountToReturn):Promise<number[]>{
        const {address,index,chainId,ethPrice} = cdsAmountToReturnDto;
        let getCdsDepositDto = new GetCdsDeposit(); 
        getCdsDepositDto = {address,index,chainId}

        const found = await this.getCdsDeposit(getCdsDepositDto);
        const priceChangeGainOrLoss = await this.cdsAmountToReturn(cdsAmountToReturnDto);
        let returnAmounts:number[];
        if(found.optedForLiquidation == true){
            const liquidationGains = await this.calculateLiquidationGains(getCdsDepositDto);
            const depositedAmintWithoutLiquidationAmount = parseFloat(found.depositedAmint) - parseFloat(found.initialLiquidationAmount);
            returnAmounts = [(depositedAmintWithoutLiquidationAmount + priceChangeGainOrLoss + liquidationGains[1] - 2*(parseFloat(found.depositedAmint))),liquidationGains[0]]
        }else{
            returnAmounts = [priceChangeGainOrLoss];
        }
        return returnAmounts;
    }
}
