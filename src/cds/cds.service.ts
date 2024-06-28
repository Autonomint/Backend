import { Inject, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { Repository,Equal } from 'typeorm';
import { AddCdsDto } from './dto/create-cds.dto';
import { CdsPositionStatus } from './cds-status.enum';
import { WithdrawCdsDto } from './dto/withdraw-cds.dto';
import { GetCdsDeposit } from './dto/get-cds-deposit.dto';
import { Contract, ethers } from 'ethers';
import { GetCdsDepositByChainId } from './dto/get-cds-deposit-by-chainid.dto';
import { CdsAmountToReturn } from './dto/cdsAmountToReturn.dto';
import { GlobalService } from '../global/global.service';
import { LiquidationInfo } from '../borrows/entities/liquidatedInfo.entity';
import { PointsService } from '../points/points.service';
import { 
    treasuryAddressSepolia,
    treasuryAddressBaseSepolia,
    treasuryABI} from '../utils/index';

@Injectable()
export class CdsService {
    constructor(
        @InjectRepository(CdsInfo)
        private cdsRepository: Repository<CdsInfo>,
        @InjectRepository(CdsDepositorInfo)
        private cdsDepositorRepository: Repository<CdsDepositorInfo>,
        @InjectRepository(LiquidationInfo)
        private liquidationInfoRepository: Repository<LiquidationInfo>,
        private globalService:GlobalService,
        private pointsService:PointsService
    ){}

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

    async getCdsLeaderboardData():Promise<CdsDepositorInfo[]>{
        const data = await this.cdsDepositorRepository.find({
            order: {
              totalDepositedAmount: 'DESC'
            },
            take: 25
          });
        for(let i = 0; i < data.length; i++){
            const userPoints = await this.pointsService.getUserPoints(data[i].chainId,data[i].address);
            data[i].points = userPoints;
        }
        return data;
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
            optedForLiquidation
        } = addCdsDto;

        await this.globalService.setBatchNo(chainId);
        const currentIndex = await this.getCdsDepositorIndexByAddress(address,chainId);
        const initialLiquidationAmount = liquidationAmount.toString();
        const totalDepositedAmount = (parseFloat(depositedAmint) + parseFloat(depositedUsdt)).toString();
        if(currentIndex <= (index-1) || currentIndex == 0){
            const result = await this.calculateValue(ethPriceAtDeposit,chainId);
            await this.setCumulativeValue(chainId,result[0],result[1]);
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
                depositVal:await this.globalService.getCumulativeValue(chainId),
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
                await this.globalService.updateNoOfUsers(chainId,true);
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
                await this.globalService.setTreasuryAmintBalance(chainId,(parseFloat(depositedAmint) + parseFloat(depositedUsdt))); 
            }else{
                await this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) + (parseFloat(depositedAmint) + parseFloat(depositedUsdt))); 
            }

            //get the amint balance in treasury
            const totalAvailableLiquidationAmount = await this.globalService.getTotalAvailableLiquidationAmount(chainId);

            // Update the amint balance in treasury
            if(!totalAvailableLiquidationAmount){
                await this.globalService.setTotalAvailableLiquidationAmount(chainId,parseFloat(initialLiquidationAmount)); 
            }else{
                await this.globalService.setTotalAvailableLiquidationAmount(chainId,parseFloat(totalAvailableLiquidationAmount.toString()) + parseFloat(initialLiquidationAmount)); 
            }

            //get amint amount
            const amintAmount= await this.globalService.getTotalCdsDepositedAmount(chainId);

            // Update TotalCdsDepositedAmount
            if(amintAmount == 0){
                await this.globalService.setTotalCdsDepositedAmount(chainId,(parseFloat(depositedAmint) + parseFloat(depositedUsdt))); 
            }else{
                await this.globalService.setTotalCdsDepositedAmount(chainId,parseFloat(amintAmount.toString()) + (parseFloat(depositedAmint) + parseFloat(depositedUsdt))); 
            }
            //Update eth price
            await this.globalService.setEthPrice(chainId,ethPriceAtDeposit);
            await this.cdsRepository.save(cds);
            await this.cdsDepositorRepository.save(cdsDepositor);
            await this.pointsService.setUSDTCDSPoints(address,chainId,depositedUsdt);
            await this.pointsService.setUSDaCDSPoints(address,chainId,depositedAmint);
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
        const withdrawEthAmountInEther = ethers.formatEther(withdrawEthAmount);
        const withdrawAmountFormated = (parseFloat(withdrawAmount)/1e6).toString();
        const feesFormated = (parseFloat(fees)/1e6).toString();
        const feesWithdrawnFormated = (parseFloat(feesWithdrawn)/1e6).toString();
        const cdsDepositor = await this.cdsDepositorRepository.findOne({where:{
            chainId:chainId,
            address:address}});

        found.withdrawTime = withdrawTime;
        found.ethPriceAtWithdraw = ethPriceAtWithdraw;
        found.withdrawAmount = withdrawAmountFormated;
        found.withdrawEthAmount = withdrawEthAmountInEther;
        found.fees = feesFormated;
        if(!cdsDepositor.totalFees){
            cdsDepositor.totalFees= parseFloat(feesFormated);     
            cdsDepositor.totalFeesWithdrawn = parseFloat(feesWithdrawnFormated);      
        }else{
            cdsDepositor.totalFees = parseFloat(cdsDepositor.totalFees.toString()) + parseFloat(feesFormated);
            cdsDepositor.totalFeesWithdrawn = parseFloat(cdsDepositor.totalFeesWithdrawn.toString()) + parseFloat(feesWithdrawnFormated);  
        }
        cdsDepositor.totalDepositedAmint = parseFloat(cdsDepositor.totalDepositedAmint.toString()) - parseFloat(found.depositedAmint);
        cdsDepositor.totalDepositedUsdt = parseFloat(cdsDepositor.totalDepositedUsdt.toString()) - parseFloat(found.depositedUsdt);
        cdsDepositor.totalDepositedAmount = parseFloat(cdsDepositor.totalDepositedAmount.toString()) - parseFloat(found.totalDepositedAmount);

        found.status = CdsPositionStatus.WITHDREW;
        if(cdsDepositor.totalDepositedAmount <= 0){
            await this.globalService.updateNoOfUsers(chainId,false);
        }

        const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);
        const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);
        //get amint amount
        const amintAmount= await this.globalService.getTotalCdsDepositedAmount(chainId);
        await this.globalService.setTotalCdsDepositedAmount(chainId,parseFloat(amintAmount.toString()) - parseFloat(withdrawAmountFormated)); 

        //Update the amint and eth balance in treasury
        await this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) - parseFloat(withdrawAmountFormated));
        await this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) - parseFloat(withdrawEthAmountInEther)); 
        await this.globalService.setEthPrice(chainId,ethPriceAtWithdraw);

        await this.cdsRepository.save(found);
        await this.cdsDepositorRepository.save(cdsDepositor);

        return found;
    }

    async cdsAmountToReturn(cdsAmountToReturnDto : CdsAmountToReturn):Promise<number>{
        const {address,index,chainId,ethPrice} = cdsAmountToReturnDto;

        const result = await this.calculateValue(ethPrice,chainId);
        await this.setCumulativeValue(chainId,result[0],result[1]);
        const withdrawVal = await this.globalService.getCumulativeValue(chainId);

        let getCdsDepositDto = new GetCdsDeposit();
        getCdsDepositDto = {address,index,chainId}
        // Get the particular deposit
        const found = await this.getCdsDeposit(getCdsDepositDto);

        //Calculate the withdraw value
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

    async setCumulativeValue(chainId:number,value:number,gains:boolean){
        let cumulativeValue = await this.globalService.getCumulativeValue(chainId);
        if(gains){
            cumulativeValue = parseFloat(cumulativeValue.toString()) + parseFloat(value.toString());
        }else{
            cumulativeValue = parseFloat(cumulativeValue.toString()) - parseFloat(value.toString());
        }
        await this.globalService.setCumulativeValue(chainId,cumulativeValue);
    }

    async calculateValue(ethPrice:number,chainId:number):Promise<[number,boolean]>{
        const amount = 1000;
        const vaultBal = await this.globalService.getTotalBorrowDepositedETH(chainId);
        const cdsBal = await this.globalService.getTotalCdsDepositedAmount(chainId);

        let priceDiff:number;
        let value:number;
        let gains:boolean;

        if(cdsBal == 0){
            value = 0;
            gains = true;
        }else{
            const ethPrices = await this.globalService.getEthPrices(chainId);
            if(ethPrice != ethPrices[1]){
                // If the current eth price is higher than last eth price,then it is gains
                if(ethPrice > ethPrices[1]){
                    priceDiff = ethPrice - ethPrices[1];
                    gains = true;    
                }else{
                    priceDiff = ethPrices[1] - ethPrice;
                    gains = false;
                }
            }
            else{
                // If the current eth price is higher than fallback eth price,then it is gains
                if(ethPrice > ethPrices[0]){
                    priceDiff = ethPrice - ethPrices[0];
                    gains = true;   
                }else{
                    priceDiff = ethPrices[0] - ethPrice;
                    gains = false;
                }
            }
            value = (amount * vaultBal * priceDiff) /cdsBal;   
        }
        return [value,gains];
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
                returnAmounts = [(depositedAmintWithoutLiquidationAmount + priceChangeGainOrLoss + liquidationGains[1] - parseFloat(found.depositedAmint)),liquidationGains[0]];
            }else{
                returnAmounts = [priceChangeGainOrLoss];
            }
        }else{
            returnAmounts = [priceChangeGainOrLoss];
        }
        return returnAmounts;
    }


    async refreshUserData(address:string, chainId:number){

        const provider = await this.getProvider(chainId);
        let treasuryContract:Contract;
        if(chainId == 11155111){
            treasuryContract = new ethers.Contract(treasuryAddressSepolia,treasuryABI,provider);
        }else if(chainId == 84532){
            treasuryContract = new ethers.Contract(treasuryAddressBaseSepolia,treasuryABI,provider);
        }

        const deposits = await treasuryContract.getBorrowing(address, 1);
        for(let i = 1; i <= deposits[1]; i++){
            const found = await this.cdsRepository.findOne({where:{
                chainId,address,index:i
            }});
            const userDepositsData = await treasuryContract.getBorrowing(address, i);
            const individualDeposit = userDepositsData[0];
            let collateralType:string;

            if(Number(individualDeposit[14]) > 0 && Number(individualDeposit[15]) > 0){
                collateralType = 'USDA&USDT'
            }else if(Number(individualDeposit[14]) > 0 && Number(individualDeposit[15]) <= 0){
                collateralType = 'USDA'
            }else if(Number(individualDeposit[14]) <= 0 && Number(individualDeposit[15]) > 0){
                collateralType = 'USDT'
            }
            if(!found){
                let depsoitDataToStore:AddCdsDto;
                depsoitDataToStore = {
                    address,
                    chainId:84532,
                    collateralType,
                    index: i,
                    aprAtDeposit:5,
                    depositedAmint:(Number(individualDeposit[14])/1e6).toString(),
                    depositedUsdt:(Number(individualDeposit[15])/1e6).toString(),
                    depositedTime:Number(individualDeposit[0]).toString(),
                    ethPriceAtDeposit:Number(individualDeposit[5]),
                    lockingPeriod:Number(individualDeposit[13]),
                    optedForLiquidation:individualDeposit[8],
                    liquidationAmount:Number(individualDeposit[10])
                }
                await this.addCds(depsoitDataToStore);
            }else if(found.status == CdsPositionStatus.DEPOSITED && individualDeposit[4] == true){
                let withdrawDataToStore:WithdrawCdsDto;
                withdrawDataToStore = {
                    address,
                    chainId:84532,
                    index:i,
                    withdrawAmount:Number(individualDeposit[3]).toString(),
                    withdrawTime:Number(individualDeposit[2]).toString(),
                    withdrawEthAmount:Number(individualDeposit[16]).toString(),
                    ethPriceAtWithdraw:Number(individualDeposit[17]),
                    fees:Number(individualDeposit[18]).toString(),
                    feesWithdrawn:Number(individualDeposit[19]).toString()
                };
                await this.cdsWithdraw(withdrawDataToStore);
            }
        }
    }
}
