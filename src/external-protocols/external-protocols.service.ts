import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,Equal } from 'typeorm'
import { ethers } from 'ethers';
import { ExternalProtocolDepositData } from './entities/external-protocol.entity';
import { AddDepositDto } from './dto/create-deposit.dto';
import { TotalExternalProtocolDepositData } from './entities/total-external-protocol-entity';
import { GlobalService } from '../global/global.service';
import { WithdrawExternalProtocolDto } from './dto/withdraw.dto';
import { GetExternalProtocolDepositDto } from './dto/get-external-protocol-deposit.dto';
import { GetExternalProtocolDepositByChainIdDto } from './dto/get-external-protocol-deposits-by-chainid.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ExternalProtocolsService {
    constructor(
        @InjectRepository(ExternalProtocolDepositData)
        private externalProtocolDepositDataRepository:Repository<ExternalProtocolDepositData>,
        @InjectRepository(TotalExternalProtocolDepositData)
        private totalExternalProtocolDepositDataRepository:Repository<TotalExternalProtocolDepositData>,
        private globalService:GlobalService
    ){}

    /**
     * returns the total index 
     * @param protocolName name of the external protocol
     * @param chainId chain
     * @returns total index ,a number
     */
    async getTotalIndex(protocolName:string,chainId:number):Promise<number>{
        const found = await this.totalExternalProtocolDepositDataRepository.findOne({
            where:{
                protocolName:protocolName,
                chainId:chainId}});
        if(!found){
            return 0;
        }else{
            return found.totalIndex;
        }
    }

    // To get the particular deposit by index
    async getExternalProtocolDeposit(getExternalProtocolDepositDto:GetExternalProtocolDepositDto):Promise<ExternalProtocolDepositData>{
        const{protocolName,index,chainId} = getExternalProtocolDepositDto;
        const found = await this.externalProtocolDepositDataRepository.findOne(
            {where:{
                protocolName:protocolName,
                chainId,
                index:index
            }});
        if(!found){
            throw new NotFoundException(`Deposit with index ${index} not found in ` +protocolName);
        }else{
            return found;
        }
    }

    // To get all the deposits in the chain
    async getDepositsByChainId(protocolName:string,chainId:number):Promise<ExternalProtocolDepositData[]>{
        const found = await this.externalProtocolDepositDataRepository.findBy({
            protocolName:Equal(protocolName),
            chainId:Equal(chainId)
        })
        if(found.length == 0){
            throw new NotFoundException(`No deposits in ` +protocolName);
        }else{
            return found;
        }
    }

    async getTotalDepositsByChainId(protocolName:string,chainId:number):Promise<TotalExternalProtocolDepositData>{
        const found = await this.totalExternalProtocolDepositDataRepository.findOne(
            {where:{
                protocolName:protocolName,
                chainId,
            }});
        if(!found){
            throw new NotFoundException(`No deposits in ` +protocolName);
        }else{
            return found;
        }
    }

    // Add deposit to external protocol
    async addDeposit(addDepositDto:AddDepositDto):Promise<ExternalProtocolDepositData>{
        const{
            protocolName,
            chainId,
            index,
            depositedAmount,
            ethPriceAtDeposit,
            creditedTokens
        } = addDepositDto;

        const currentIndex = await this.getTotalIndex(protocolName,chainId);
        const depositedAmountInEth = ethers.formatEther(depositedAmount);
        const creditedTokensInEth = ethers.formatEther(creditedTokens);

        if(currentIndex == (index-1)){
            const deposit = this.externalProtocolDepositDataRepository.create({
                protocolName,
                chainId,
                index,
                depositedAmount:depositedAmountInEth,
                creditedTokens:creditedTokensInEth
            })

            let totalDeposit = await this.totalExternalProtocolDepositDataRepository.findOne({
                where:{
                    protocolName:protocolName,
                    chainId:chainId}});
            if(!totalDeposit){
                totalDeposit = new TotalExternalProtocolDepositData();
                totalDeposit.protocolName = protocolName;
                totalDeposit.chainId = chainId;
                totalDeposit.totalIndex = index;
                totalDeposit.totalDepositedEthAmount = parseFloat(depositedAmountInEth);
                totalDeposit.totalCreditedTokens = parseFloat(creditedTokensInEth);
                totalDeposit.deposits = [deposit];
            }else{
                totalDeposit.totalDepositedEthAmount = parseFloat(totalDeposit.totalDepositedEthAmount.toString()) + parseFloat(depositedAmountInEth);
                totalDeposit.totalCreditedTokens = parseFloat(totalDeposit.totalCreditedTokens.toString()) + parseFloat(creditedTokensInEth);
                totalDeposit.deposits.push(deposit);
            }

            // Get eth balance in treasury
            const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);

            // Update the eth balance in treasury
            await this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) - parseFloat(depositedAmountInEth)); 

            await this.externalProtocolDepositDataRepository.save(deposit);
            await this.totalExternalProtocolDepositDataRepository.save(totalDeposit);
            return deposit;
        }else{
            throw new NotFoundException('Incorrect index');
        }
    }

    // Withdraw the eth from external protocol
    async externalProtocolWithdraw(withdrawDto:WithdrawExternalProtocolDto):Promise<ExternalProtocolDepositData>{
        const{
            protocolName,
            chainId,
            index,
            withdrawAmount,
            interestGained,
        } = withdrawDto;

        const withdrawAmountInEth = ethers.formatEther(withdrawAmount);
        const interestGainedInEth = ethers.formatEther(interestGained);

        const found = await this.externalProtocolDepositDataRepository.findOne({
            where:{
                protocolName:protocolName,
                chainId:chainId,
                index:index}});
        found.withdrawAmount = withdrawAmountInEth;
        found.interestGained = interestGainedInEth;

        const totalDeposit = await this.totalExternalProtocolDepositDataRepository.findOne({
            where:{
                protocolName:protocolName,
                chainId:chainId}});
        if(!totalDeposit.totalInterestGained){
            totalDeposit.totalInterestGained = parseFloat(interestGainedInEth);
            totalDeposit.totalWithdrewAmount = parseFloat(withdrawAmountInEth);
        }else{
            totalDeposit.totalInterestGained = parseFloat(totalDeposit.totalInterestGained.toString()) + parseFloat(interestGainedInEth);
            totalDeposit.totalWithdrewAmount = parseFloat(totalDeposit.totalWithdrewAmount.toString()) + parseFloat(withdrawAmountInEth);
        }
        totalDeposit.totalCreditedTokens = parseFloat(totalDeposit.totalCreditedTokens.toString()) - parseFloat(found.creditedTokens);
        // Get the eth balance in treasury
        const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);
        // Update the eth balance in treasury
        await this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) + parseFloat(withdrawAmount)); 

        await this.externalProtocolDepositDataRepository.save(found);
        await this.totalExternalProtocolDepositDataRepository.save(totalDeposit);
        
        return found;

    }

    
    private counter = 0; // Keep track of generated codes (if not using uuid)
    private bigCounter = 1; // Keep track of generated codes (if not using uuid)
    private alphabetIndex = 0;

    generateReferralCode(): string {

        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // if (process.env.USE_UUID === 'true') {
        //     return `A${uuidv4().slice(0, 4)}`; // Shorten the uuid for aesthetics
        // }

        if(this.counter >= 999 ){
            this.counter = 0;
            this.alphabetIndex++;
        }

        if(this.alphabetIndex > 25){
            this.alphabetIndex = 0;
            this.bigCounter++;
        }

        this.counter++;
        return this.bigCounter.toString().padStart(1, '0') + alphabet[this.alphabetIndex] + this.counter.toString().padStart(3, '0'); // Pad with zeros
    }

}
