import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus } from './borrow-status.enum';
import { AddBorrowDto } from './dto/create-borrow.dto';
import { GetBorrowFilterDto } from './dto/get-borrow-filter.dto';
import { BorrowInfo } from './entities/borrow.entity';
import { Repository,Equal,Not,MoreThanOrEqual } from 'typeorm';
import { ethers } from 'ethers';
import { BorrowerInfo } from './entities/borrower.entity';
import { WithdrawDto } from './dto/withdraw.dto';
import { GetBorrowDeposit } from './dto/get-borrow-deposit.dto';
import { CriticalPositions } from './entities/liquidation.entity';
import { bybit } from 'ccxt';

import {
    borrowAddressSepolia,borrowABISepolia,
    optionsAddressSepolia,optionsABISepolia,
    poolAddressSepolia,poolABISepolia,

    borrowAddressMumbai,borrowABIMumbai,
    optionsAddressMumbai,optionsABIMumbai,

} from '../utils/index';
import { GetBorrowDepositByChainId } from './dto/get-borrow-deposit-by-chainid.dto';
import { Cron,CronExpression } from '@nestjs/schedule';
import { GlobalService } from '../global/global.service';
import { LiquidationInfo } from './entities/liquidatedInfo.entity';
import { StrikePricePercent } from './borrow-strike-price.enum';
import { Batch } from './entities/batch.entity';
import { HighLTVPositions } from './entities/high-ltv-positions.entity';
import { Charts } from './entities/chart.entity';
import { GlobalVariables } from '../global/entities/global.entity';
import { AllTime } from './allTime-fetch.enum';
import { AmintPrice } from './entities/amint-price.entity';
import { Days } from './entities/day.entity';
import { ConfigService } from '@nestjs/config';
require('dotenv').config();

@Injectable()
export class BorrowsService {

    constructor(
        @InjectRepository(BorrowInfo)
        private borrowRepository: Repository<BorrowInfo>,
        @InjectRepository(BorrowerInfo)
        private borrowerRepository: Repository<BorrowerInfo>,
        @InjectRepository(CriticalPositions)
        private criticalPositionsRepository: Repository<CriticalPositions>,
        @InjectRepository(LiquidationInfo)
        private liquidationInfoRepository: Repository<LiquidationInfo>,
        @InjectRepository(Batch)
        private batchRepository: Repository<Batch>,
        @InjectRepository(HighLTVPositions)
        private highLtvPositionsRepository: Repository<HighLTVPositions>,
        @InjectRepository(Charts)
        private chartRepository: Repository<Charts>,
        @InjectRepository(AmintPrice)
        private amintPriceRepository: Repository<AmintPrice>,
        @InjectRepository(Days)
        private daysRepository: Repository<Days>,
        @InjectRepository(GlobalVariables)
        private globalRepository: Repository<GlobalVariables>,
        @Inject(GlobalService)
        private globalService:GlobalService,
        private configService:ConfigService
    ){}

    private chainIds = [11155111,80001];

    private exchange = new bybit({
        apiKey: 'BNi0E7lvKWezOwjV0N',
        secret: 'ER4G9Vm1z01Xzr31HbzofYLlU9m7ISue1ixo',
    });

    getDeposits(getBorrowFilterDto:GetBorrowFilterDto):Promise<BorrowInfo[]>{
        const {
            address,
            collateralType,
            index,
            depositedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            status} = getBorrowFilterDto;
        const query = this.borrowRepository.createQueryBuilder('deposit');

        if(collateralType){
            query.andWhere('deposit.collateralType = :collateralType',{collateralType});
        }
        if(index){
            query.andWhere('deposit.index = :index',{index});
        }
        if(depositedAmount){
            query.andWhere('deposit.depositedAmount = :depositedAmount',{depositedAmount});
        }
        if(depositedTime){
            query.andWhere('deposit.depositedTime = :depositedTime',{depositedTime});
        }
        if(ethPrice){
            query.andWhere('deposit.ethPrice = :ethPrice',{ethPrice});
        }
        if(noOfAmintMinted){
            query.andWhere('deposit.noOfAmintMinted = :noOfAmintMinted',{noOfAmintMinted});
        }
        if(strikePrice){
            query.andWhere('deposit.strikePrice = :strikePrice',{strikePrice});
        }
        if(status){
            query.andWhere('deposit.status = :status',{status});
        }
        const deposits = query.getMany();
        return deposits;
    }

    async getDepositsById(id:string):Promise<BorrowInfo>{
        const found = await this.borrowRepository.findOne({where:{id:id}});
        if(!found){
            throw new NotFoundException(`Deposit with ID "${id}" not found`);
        }else{
            return found;
        }
    }
     /**
      * 
      * @param getBorrowDeposit dto to get borrower's deposit based on index and chain id
      * @returns BorrowInfo
      */
    async getBorrowDeposit(getBorrowDeposit:GetBorrowDeposit):Promise<BorrowInfo>{
        const{address,index,chainId} = getBorrowDeposit;
        const found = await this.borrowRepository.findOne(
            {where:{
                address:address,
                chainId:chainId,
                index:index
            }});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" & index "${index}" not found`);
        }else{
            return found;
        }
    }

    /**
     * 
     * @param address address of the depositor
     * @param chainId chainID
     * @returns Entire borrowerInfo for that chainId
     */
    async getDepositorByAddress(address:string,chainId:number):Promise<BorrowerInfo>{
        const found = await this.borrowerRepository.findOne({where:{
            chainId,address}});
        if(!found){
            throw new NotFoundException(`Deposit with address "${address}" not found`);
        }else{
            return found;
        }
    }

    /**
     * 
     * @param address address of the depositor
     * @param chainId chainId
     * @returns totalIndex of the depositor,a number
     */
    async getDepositorIndexByAddress(address:string,chainId:number):Promise<number>{
        const found = await this.borrowerRepository.findOne({where:{
            chainId:chainId,
            address:address}});
        if(!found){
            return 0;
        }else{
            return found.totalIndex;
            }
        }
    
        /**
         * 
         * @param address address od the depositor
         * @param chainId chainId
         * @returns Total deposits array
         */
    async getDepositsByChainId(address:string,chainId:number):Promise<BorrowInfo[]>{
        const found = await this.borrowRepository.findBy({
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
     * 
     * @param addBorrowDto To add deposits
     * @returns The added deposit info
     */
    async addBorrow(addBorrowDto:AddBorrowDto):Promise<BorrowInfo>{
        const{
            address,
            chainId,
            collateralType,
            index,
            downsideProtectionPercentage,
            aprAtDeposit,
            depositedAmount,
            normalizedAmount,
            depositedTime,
            ethPrice,
            noOfAmintMinted,
            strikePrice,
            optionFees,
            strikePricePercent,
        } = addBorrowDto;

        await this.globalService.setBatchNo(chainId);
        const batchNo = await this.globalService.getBatchNo(chainId);
        const currentIndex = await this.getDepositorIndexByAddress(address,chainId);
        const strikePriceCalculated = (ethPrice * (1 + strikePrice/100));
        const noOfAmintInEther = (parseFloat(noOfAmintMinted)/1e6).toString();
        const optionFeesInEther = (parseFloat(optionFees)/1e6).toString();
        if(currentIndex == (index-1) || currentIndex == 0){
            // Calculating liquidation eth price as 80% of current eth price
            const liquidationEthPrice = (ethPrice*80)/100;
            // Calculating critical eth price as 83% of current eth price
            const criticalEthPrice = (ethPrice*83)/100;
            const borrow = this.borrowRepository.create({
                address,
                index,
                chainId,
                batchNo:batchNo,
                collateralType,
                downsideProtectionPercentage,
                aprAtDeposit,
                depositedAmount,
                normalizedAmount,
                depositedTime,
                ethPrice,
                liquidationEthPrice,
                criticalEthPrice,
                noOfAmintMinted:noOfAmintInEther,
                strikePrice:strikePriceCalculated,
                optionFees:optionFeesInEther,
                downsideProtectionStatus:true,
                totalFeesDeducted:(parseFloat(optionFeesInEther)/30).toString(),
                strikePricePercent:StrikePricePercent[strikePricePercent],
                status:PositionStatus.DEPOSITED
            });

            let borrower = await this.borrowerRepository.findOne({where:{
                chainId:chainId,
                address:address}});

            if(!borrower){
                borrower = new BorrowerInfo();
                borrower.chainId = chainId;
                borrower.totalDepositedAmount = parseFloat(depositedAmount);
                borrower.totalAmint = parseFloat(noOfAmintInEther);
                borrower.totalAbond = 0;
                borrower.totalIndex = index;
                borrower.borrows = [borrow];
            }else{
                borrower.totalDepositedAmount = parseFloat(borrower.totalDepositedAmount.toString()) + parseFloat(depositedAmount);
                borrower.totalAmint = parseFloat(borrower.totalAmint.toString()) +  parseFloat(noOfAmintInEther);
                borrower.totalIndex = index;
                borrower.borrows.push(borrow);
            }
            borrower.address = address;

            let batch = await this.batchRepository.findOne({where:{
                chainId:chainId,
                batchNo:batchNo}});
            if(!batch){
                batch = new Batch();
                batch.deposits = [borrow]
            }else{
                batch.deposits.push(borrow);
            }

            // Getting eth balance in treasury
            const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);

            // Updating eth balance in treasury
            if(ethBalance == 0){
                await this.globalService.setTreasuryEthBalance(chainId,parseFloat(depositedAmount)); 
            }else{
                await this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) + parseFloat(depositedAmount)); 
            }

            // Getting TotalBorrowDepositedETH
            const depositedETH = await this.globalService.getTotalBorrowDepositedETH(chainId);
            // Updating TotalBorrowDepositedETH
            if(depositedETH == 0){
                await this.globalService.setTotalBorrowDepositedETH(chainId,parseFloat(depositedAmount)); 
            }else{
                await this.globalService.setTotalBorrowDepositedETH(chainId,parseFloat(depositedETH.toString()) + parseFloat(depositedAmount)); 
            }
            await this.borrowRepository.save(borrow);
            await this.borrowerRepository.save(borrower);
            await this.batchRepository.save(batch);

            return borrow;
        }else{
            throw new NotFoundException('Incorrect index') ;
        }
    }

    /**
     * 
     * @param withdrawDto to withdraw the position
     * @returns The details of withdrew position
     */
    async withdraw(withdrawDto:WithdrawDto):Promise<BorrowInfo>{
        const{
            address,
            chainId,
            index,
            withdrawTime,
            withdrawAmount,
            amountYetToWithdraw,
            noOfAbond,
            totalDebtAmount
        } = withdrawDto;

        const found = await this.borrowRepository.findOne(
            {where:{
                address:address,
                chainId:chainId,
                index:index
            }});
        const borrower = await this.borrowerRepository.findOne({where:{address:address}});
        // Formatting the values in wei to Ether
        const withdrawAmountInEther = ethers.utils.formatEther(withdrawAmount);
        const amountYetToWithdrawInEther = ethers.utils.formatEther(amountYetToWithdraw);
        const noOfAbondInEther = (parseFloat(noOfAbond)/1e18).toString();
        const totalDebtAmountInEther = (parseFloat(totalDebtAmount)/1e6).toString();

        if(!found.withdrawAmount1 && found.status != PositionStatus.LIQUIDATED){
            found.withdrawTime1 = withdrawTime;
            found.withdrawAmount1 = withdrawAmountInEther;
            found.noOfAbondMinted = parseFloat(noOfAbondInEther);
            found.amountYetToWithdraw = amountYetToWithdrawInEther;
            found.totalDebtAmount = totalDebtAmountInEther;
            found.status = PositionStatus.WITHDREW1;
            borrower.totalDepositedAmount = parseFloat(borrower.totalDepositedAmount.toString()) - parseFloat(found.depositedAmount);
            borrower.totalAmint = parseFloat(borrower.totalAmint.toString()) - parseFloat(found.noOfAmintMinted);
            borrower.totalAbond = parseFloat(borrower.totalAbond.toString()) +  parseFloat(noOfAbondInEther);

        }else{
            found.withdrawTime2 = withdrawTime;  
            found.withdrawAmount2 = withdrawAmountInEther;
            borrower.totalAbond = parseFloat(borrower.totalAbond.toString()) - parseFloat(noOfAbondInEther);
            found.amountYetToWithdraw = '0';
            found.status = PositionStatus.WITHDREW2;      
        }

        const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);
        // Getting TotalBorrowDepositedETH
        const depositedETH = await this.globalService.getTotalBorrowDepositedETH(chainId);
        // Updating TotalBorrowDepositedETH
        await this.globalService.setTotalBorrowDepositedETH(chainId,parseFloat(depositedETH.toString()) - parseFloat(withdrawAmountInEther)); 
        // Updating eth balance in treasury
        await this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) - parseFloat(withdrawAmountInEther));

        await this.borrowRepository.save(found);
        await this.borrowerRepository.save(borrower);

        return found;
    }

    /**
     * For every 3 days it creates the array of postions if they are in going to be loquidate stage
     * @returns Critical Positions array
     */
    @Cron("0 0 */3 * *")
    async createCriticalPositions():Promise<CriticalPositions[]>{
        const provider = await this.getSignerOrProvider(80001,false);
        const borrowingContract = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,provider);
        const currentEthPrice = await borrowingContract.getUSDValue();
        const ethPrice = (currentEthPrice.toNumber())/100;

        //Filtering the positions based on current eth price
        const positions = await this.borrowRepository.findBy({
             criticalEthPrice:MoreThanOrEqual(ethPrice)
        });

        // Creating critical position by deposit data
        const criticalPositions = positions.map((position) =>{
            const criticalPosition = new CriticalPositions();
            criticalPosition.positionId = position.id
            criticalPosition.address = position.address
            criticalPosition.index = position.index
            criticalPosition.depositedEthAmount = position.depositedAmount
            criticalPosition.ethPriceAtDeposit = position.ethPrice
            criticalPosition.ethPriceAtLiquidation = position.liquidationEthPrice
            criticalPosition.criticalEthPrice = position.criticalEthPrice
            return criticalPosition;
        })

        // Getting all the entities in critical postions
        const existingEntities = await this.criticalPositionsRepository.find();
        // Check whether the positions are already not stored 
        const liquidationPositions = criticalPositions.filter(criticalPosition => !existingEntities.some(existingEntity => existingEntity.positionId === criticalPosition.positionId));

        await this.criticalPositionsRepository.save(liquidationPositions);
        return liquidationPositions;
    }

    /**
     * Liquidate the positions if the position is in liquidation stages,check for every 5 minutes
     * @returns liquidated positions
     */
    @Cron(CronExpression.EVERY_5_MINUTES)
    async liquidate():Promise<CriticalPositions[]>{
        const signerMumbai = await this.getSignerOrProvider(80001,true);
        const borrowingContractMumbai = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signerMumbai);
        const signerSepolia = await this.getSignerOrProvider(11155111,true);
        const borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signerSepolia);

        let borrowingContract;
        const currentEthPrice = await borrowingContractMumbai.getUSDValue();
        const ethPrice = currentEthPrice.toNumber()/100;
        const liquidationPositions = await this.criticalPositionsRepository.findBy({
            ethPriceAtLiquidation:MoreThanOrEqual(ethPrice)
        });
        if(liquidationPositions.length != 0){
        let liquidatedPositions:BorrowInfo[];
        for(let i=0;i<liquidationPositions.length;i++){
            if(!liquidatedPositions){
                liquidatedPositions = [await this.borrowRepository.findOne({where:
                    {id:Equal(liquidationPositions[i].positionId)}})]
            }else{
                liquidatedPositions.push(await this.borrowRepository.findOne({where:
                    {id:Equal(liquidationPositions[i].positionId)}
                }));
            }
        }
        // Liquidate the positions by calling liquidation function in borrowing contract
        liquidatedPositions.map(async (liquidatedPosition) =>{
            if(liquidatedPosition.chainId == 80001){
                borrowingContract = borrowingContractMumbai;
            }else if(liquidatedPosition.chainId == 11155111){
                borrowingContract = borrowingContractSepolia
            }
            await borrowingContract.liquidate(liquidatedPosition.address,liquidatedPosition.index,currentEthPrice);
            liquidatedPosition.status = PositionStatus.LIQUIDATED;
            const chainId = liquidatedPosition.chainId;      
            borrowingContract.on('Liquidate',async (index,liquidationAmount,profits,ethAmount,availableLiquidationAmount) => {
                const liquidationInfo = this.liquidationInfoRepository.create({
                    chainId:chainId,
                    index,
                    liquidationAmount,
                    profits,
                    ethAmount,
                    availableLiquidationAmount,
                })
                await this.liquidationInfoRepository.save(liquidationInfo);
                //Update the liquidationIndex i.e no of liquidations done so far
                await this.globalService.setLiquidationIndex(chainId,index);
                const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);
                // Update the amint and liquidation amount balance in treasury
                await this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) - parseFloat(liquidationAmount))
                await this.globalService.setTotalAvailableLiquidationAmount(chainId,availableLiquidationAmount);
            })
        });
        await this.criticalPositionsRepository.remove(liquidationPositions);
        await this.borrowRepository.save(liquidatedPositions);
    }
        return liquidationPositions;
    }

    async getSignerOrProvider(chainId:number,needSigner = false){
        let rpcUrl:string;
        let pKey:string;
        if(chainId == 11155111){
            rpcUrl = "https://sepolia.infura.io/v3/e9cf275f1ddc4b81aa62c5aa0b11ac0f"
            pKey = 'ec619e44ab8377982c53722fbb1a39549c8e927f440f769e5c74313fb7e7eb3f'
        }else if(chainId == 80001){
            rpcUrl = "https://capable-stylish-general.matic-testnet.discover.quiknode.pro/25a44b3acd03554fa9450fe0a0744b1657132cb1/"
            pKey = '3cdf792b14656fcdcc415ba2fde3c7fbadacdcc887778f36e8ce98db34021e15';
        }
        const provider =  new ethers.providers.JsonRpcProvider(rpcUrl);
        if(needSigner){
                const wallet = new ethers.Wallet(pKey,provider);
                return wallet;
        }
        return provider;
    };

    /**
     * 
     * @param chainId chainId
     * @param amount amount going to deposit
     * @returns ethVolatility and option price
     */
    async getEthVolatility(chainId:number,amount:string,ethPrice:number,strikePricePercent:number):Promise<[number,number]>{
        const abc = await this.exchange.fetchVolatilityHistory('ETH',{period:30});
        const volatility = (abc.map(item => item.info[0].value)[0] * 1e8);
        if(await this.globalService.getTotalCdsDepositedAmount(chainId) == 0){
            return [Math.floor(volatility),0];
        }else{
            const signer = await this.getSignerOrProvider(chainId,true);
            let optionsContract;
            if(chainId == 11155111){
                optionsContract = new ethers.Contract(optionsAddressSepolia,optionsABISepolia,signer);
            }else if(chainId == 80001){
                optionsContract = new ethers.Contract(optionsAddressMumbai,optionsABIMumbai,signer);
            }
            const optionFees = await optionsContract.calculateOptionPrice(ethPrice,Math.floor(volatility),BigInt(amount),strikePricePercent);
    
            return[Math.floor(volatility),optionFees.toNumber()];
        }
    }

    /**
     * 
     * @param chainId chainId
     * @returns ratio of cds to the eth vault
     */

    async getRatio(chainId:number,ethPrice:number):Promise<number>{
        const signer = await this.getSignerOrProvider(chainId,true);
        let borrowingContract;
        if(chainId == 11155111){
            borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signer);
        }else if(chainId == 80001){
            borrowingContract = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signer);
        }
        const ethVaultValue = await borrowingContract.lastEthVaultValue();
        const cdsPoolValue = await borrowingContract.lastCDSPoolValue();
        const ratio = ((cdsPoolValue * 1e14)/ethVaultValue);

        return ratio;
    }

    getAmintPrice(data:BigInt):number {
        const Decimal0 = 6;
        const Decimal1 = 18;
        const sqrtPriceX96 = Number(data);
        const buyOneOfToken0 = ((sqrtPriceX96 / 2**96)**2) / (Number((10**Decimal1 / 10**Decimal0).toFixed(Decimal1)));
        const buyOneOfToken1 = Number((1 / Number(buyOneOfToken0))).toFixed(Decimal0);
        return Number(buyOneOfToken0) * Number(buyOneOfToken1);
    }

    // Create chart data
    // Runs every day
    @Cron('0 0 0/24 * * *')
    // @Cron(CronExpression.EVERY_10_SECONDS,{name:'Create chart data'})
    async createChart(){
        for (let i = 0;i < this.chainIds.length;i++){
            const found = await this.globalRepository.findOne({where:{
                chainId:this.chainIds[i],
                treasuryEthBalance:Not(0),
                treasuryAmintBalance:Not(0)
            }});
            if(found){
                const signer = await this.getSignerOrProvider(this.chainIds[i],true);
                const signerSepolia = await this.getSignerOrProvider(11155111,true);

                let borrowingContract;
                let poolContract;
                poolContract = new ethers.Contract(poolAddressSepolia,poolABISepolia,signerSepolia);

                if(this.chainIds[i] == 11155111){
                    borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signer);
                }else if(this.chainIds[i] == 80001){
                    borrowingContract = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signer);
                }
                const currentEthPrice = await borrowingContract.getUSDValue();
                const optionfees = await this.getEthVolatility(this.chainIds[i],(ethers.utils.parseEther('1')).toString(),currentEthPrice,0);
                const ratio = await this.getRatio(this.chainIds[i],currentEthPrice);
                const slot0 = await poolContract.slot0();

                const newChart = this.chartRepository.create({
                    chainId:this.chainIds[i],
                    day:parseInt(found.day? (found.day).toString() : '0') + 1,
                    optionFees:(optionfees[1]/1e6),
                    amintPrice:this.getAmintPrice(slot0[0]),
                    ratio:ratio
                })
                found.day = parseInt(found.day? (found.day).toString() : '0') + 1;
                await this.chartRepository.save(newChart);
                await this.globalRepository.save(found);
            }
        }
    }

    // Runs every day
    @Cron('0 0 0/24 * * *',{name:'Create chart data'})
    // @Cron(CronExpression.EVERY_10_SECONDS,{name:'Create chart data'})
    async createAmintPriceChart(){
        for (let i = 0;i < this.chainIds.length;i++){

            const signerSepolia = await this.getSignerOrProvider(11155111,true);

            let poolContract;
            poolContract = new ethers.Contract(poolAddressSepolia,poolABISepolia,signerSepolia);
            const slot0 = await poolContract.slot0();

            let newChart:AmintPrice
            let found = await this.daysRepository.findOne({where:{chainId:this.chainIds[i]}});

            if(!found){
                found = new Days();
                found.chainId = this.chainIds[i]
                found.days = 1

                newChart = this.amintPriceRepository.create({
                    chainId:this.chainIds[i],
                    day:1,
                    amintPrice:this.getAmintPrice(slot0[0]),
                })
            }else{
                newChart = this.amintPriceRepository.create({
                    chainId:this.chainIds[i],
                    day:parseInt(found? (found.days).toString() : '0') + 1,
                    amintPrice:this.getAmintPrice(slot0[0]),
                })
    
                found.days = parseInt(found.days? (found.days).toString() : '0') + 1;
            }

            await this.amintPriceRepository.save(newChart);
            await this.daysRepository.save(found);
        }
    }

    /**
     * 
     * @param chainId chain id
     * @param days number of days of data want
     * @param allTime whether need all time data
     * @returns 
     */
    async getOptionFeesHistory(chainId:number,days:number,allTime:AllTime):Promise<number[]>{
        let optionFees:number[];
        if(allTime == AllTime.YES){
            days = (await this.globalRepository.findOne({where:{chainId:chainId}})).day;
        }
        for(let i = 1;i<=days;i++){
            const found = await this.chartRepository.findOne({where:{
                chainId:chainId,
                day:i
            }})
            if(found){
                if(optionFees){
                    optionFees.push(found.optionFees);
                }else{
                    optionFees = [found.optionFees]
                }
            }else{
                return optionFees;
            }
        }
        return optionFees;
    }

    /**
     * 
     * @param chainId chain id
     * @param days number of days of data want
     * @param allTime whether need all time data
     * @returns 
     */

    async getRatioHistory(chainId:number,days:number,allTime:AllTime):Promise<number[]>{
        let ratio:number[];
        if(allTime == AllTime.YES){
            days = (await this.globalRepository.findOne({where:{chainId:chainId}})).day;
        }
        for(let i = 1;i<=days;i++){
            const found = await this.chartRepository.findOne({where:{
                chainId:chainId,
                day:i
            }})
            if(found){
                if(ratio){
                    ratio.push(found.ratio);
                }else{
                    ratio = [found.ratio]
                }
            }else{
                return ratio;
            }
        }
        return ratio;
    }

    /**
     * 
     * @param chainId chain id
     * @param days number of days of data want
     * @param allTime whether need all time data
     * @returns 
     */

    async getBorrowingFeesHistory(chainId:number,days:number,allTime:AllTime):Promise<number[]>{
        let borrowingFees:number[];
        if(allTime == AllTime.YES){
            days = (await this.globalRepository.findOne({where:{chainId:chainId}})).day;
        }
        for(let i = 1;i<=days;i++){
            const found = await this.chartRepository.findOne({where:{
                chainId:chainId,
                day:i
            }})
            if(found){
                if(borrowingFees){
                    borrowingFees.push(found.borrowingFees);
                }else{
                    borrowingFees = [found.borrowingFees]
                }
            }else{
                return borrowingFees;
            }
        }
        return borrowingFees;
    }

    // funtion for getting priceHistory 
    async getAmintPriceHistory(chainId:number,days:number,allTime:AllTime):Promise<number[]>{
        let amintPrice:number[];
        if(allTime == AllTime.YES){
            days = (await this.daysRepository.findOne({where:{chainId:chainId}})).days;
        }
        for(let i = 1;i<=days;i++){
            const found = await this.amintPriceRepository.findOne({where:{
                chainId:chainId,
                day:i
            }})
            if(found){
                if(amintPrice){
                    amintPrice.push(found.amintPrice);
                }else{
                    amintPrice = [found.amintPrice]
                }
            }else{
                return amintPrice;
            }
        }
        return amintPrice;
    }

    // /**
    //  * Everyday it gets the option fees for a ETH,and deduct the option fees for the user based on the deposited amount
    //  */
    // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    // async calculatePeriodicFee(){
    //     const signerMumbai = await this.getSignerOrProvider(80001,true);
    //     const optionsContractMumbai = new ethers.Contract(optionsAddressMumbai,optionsABIMumbai,signerMumbai);
    //     const signerSepolia = await this.getSignerOrProvider(11155111,true);
    //     const optionsContractSepolia = new ethers.Contract(optionsAddressSepolia,optionsABISepolia,signerSepolia);
    //     const abc = await this.exchange.fetchVolatilityHistory('ETH',{period:30});
    //     const volatility = abc.map(item => item.info[0].value)[0];
    //     let optionsFeesMumbai;
    //     let optionsFeesSepolia;
    //     //Get the option fees for all strike prices
    //     for(let i=0;i<5;i++){
    //         if(!optionsFeesMumbai){
    //             optionsFeesMumbai = [await optionsContractMumbai.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i)]
    //         }else if(!optionsFeesSepolia){
    //             optionsFeesSepolia = [await optionsContractSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i)]
    //         }else {
    //             optionsFeesMumbai.push(await optionsContractMumbai.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i));
    //             optionsFeesSepolia.push(await optionsContractSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i));
    //         }
    //         optionsFeesMumbai.push(await optionsContractMumbai.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i));
    //         optionsFeesSepolia.push(await optionsContractSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i));
    //     }

    //     // Filter the deposits based on chainId and status of the deposit
    //     const activePositionsSepolia = await this.borrowRepository.findBy(
    //         {
    //             chainId:Equal(11155111),
    //             status:Equal(PositionStatus.DEPOSITED)
    //         });
    //     const activePositionsMumbai = await this.borrowRepository.findBy(
    //         {                    
    //             chainId:Equal(80001),
    //             status:Equal(PositionStatus.DEPOSITED)
    //         });
    //     //Loop through all the deposits and deduct option fees based on their strike prices and deposited amount
    //     for(let i=0;i<5;i++){
    //         if(activePositionsMumbai.length != 0){
    //             activePositionsMumbai.map(activePosition =>{
    //                 if(Object.keys(StrikePricePercent).indexOf(activePosition.strikePricePercent) == i){
    //                     activePosition.totalFeesDeducted = (parseFloat(activePosition.totalFeesDeducted) + ((optionsFeesMumbai[i] * parseFloat(activePosition.depositedAmount))/30)).toString();
    //                 }
    //             })                
    //         }
    //         if(activePositionsSepolia.length != 0){
    //             activePositionsSepolia.map(activePosition =>{
    //                 if(Object.keys(StrikePricePercent).indexOf(activePosition.strikePricePercent) == i){
    //                     activePosition.totalFeesDeducted = (parseFloat(activePosition.totalFeesDeducted) + (optionsFeesSepolia[i] * parseFloat(activePosition.depositedAmount))/30).toString();
    //                 }
    //             })                
    //         }
    //     }
    //     // Save the updated data
    //     await this.borrowRepository.save(activePositionsMumbai);
    //     await this.borrowRepository.save(activePositionsSepolia);
    // }



    // For every 5 minutes it checks whether the option fees duration is over or not
    // if yes,update this position needs to liquidate at 90%
    @Cron(CronExpression.EVERY_5_MINUTES)
    // @Cron("0 */2 * * * *")
    async updateDownsideProtectionStatus(){

        for (let i = 0;i < this.chainIds.length;i++){
            //Getting current batch number
            const currentBatchNo = await this.globalService.getBatchNo(this.chainIds[i]);
            //If current batch number is less than or equal to 30,return
            if(currentBatchNo > 30){
                // Getting positions based on batch number starting from 1
                const updatingPositions = await this.batchRepository.findOne({where:{
                    chainId:this.chainIds[i],
                    batchNo:Equal(currentBatchNo - 30)
                }});

                // If the status of the position is deposited only,then update the liquidationEthPrice
                updatingPositions.deposits.map(updatingPosition =>{
                    if(updatingPosition.status == PositionStatus.DEPOSITED){
                        updatingPosition.downsideProtectionStatus = false;
                        updatingPosition.liquidationEthPrice = (updatingPosition.ethPrice * 90)/100;            
                    }
                })
                // Update the changes
                await this.borrowRepository.save(updatingPositions.deposits);
                await this.batchRepository.save(updatingPositions);
            }else{
                return;
            }
        }
        // //Getting current batch number
        // const currentBatchnNoMumbai = await this.globalService.getBatchNo(80001);
        // const currentBatchnNoSepolia = await this.globalService.getBatchNo(11155111);
        // //If current batch number is less than or equal to 30,return
        // if(currentBatchnNoMumbai > 30){
        //     // Getting positions based on batch number starting from 1
        //     const updatingPositionsMumbai = await this.batchRepository.findOne({where:{
        //         chainId:80001,
        //         batchNo:Equal(currentBatchnNoMumbai - 30)
        //     }});

        //     // If the status of the position is deposited only,then update the liquidationEthPrice
        //     updatingPositionsMumbai.deposits.map(updatingPosition =>{
        //         if(updatingPosition.status == PositionStatus.DEPOSITED){
        //             updatingPosition.downsideProtectionStatus = false;
        //             updatingPosition.liquidationEthPrice = (updatingPosition.ethPrice * 90)/100;            
        //         }
        //     })
        //     // Update the changes
        //     await this.borrowRepository.save(updatingPositionsMumbai.deposits);
        //     await this.batchRepository.save(updatingPositionsMumbai);
        // }
        // //If current batch number is less than or equal to 30,return
        // if(currentBatchnNoSepolia > 30){
        //     // Getting positions based on batch number starting from 1
        //     const updatingPositionsSepolia = await this.batchRepository.findOne({where:{
        //         chainId:11155111,
        //         batchNo:Equal(currentBatchnNoSepolia - 30)
        //     }});

        //     // If the status of the position is deposited only,then update the liquidationEthPrice
        //     updatingPositionsSepolia.deposits.map(updatingPosition =>{
        //         if(updatingPosition.status == PositionStatus.DEPOSITED){
        //             updatingPosition.downsideProtectionStatus = false;
        //             updatingPosition.liquidationEthPrice = (updatingPosition.ethPrice * 90)/100;
        //         }
        //     })
        //     // Update the changes
        //     await this.batchRepository.save(updatingPositionsSepolia);
        // }
    }

    // For every 5 minutes, it checks whether the expired option fees positions are in liquidation stage,if yes liquidate
    // If the ltv of the protocol is above 90,then don't liquidate the positions and store them in seperate repository

    @Cron(CronExpression.EVERY_5_MINUTES)
    // @Cron("0 */1 * * * *")
    async liquidateOptionsExpiredUsers(){
        let liquidationPositionsFromBatch:Batch;
        for (let i = 0;i < this.chainIds.length;i++){
            //Getting current batch number
            const currentBatchNo = await this.globalService.getBatchNo(this.chainIds[i]);
            //If current batch number is less than or equal to 30,return
            if(currentBatchNo > 30){
                // Getting positions based on batch number starting from 1
                liquidationPositionsFromBatch = await this.batchRepository.findOne({where:{
                    chainId:this.chainIds[i],
                    batchNo:Equal(currentBatchNo - 30)
                }});
            }else{
                return;
            }

            let borrowingContract;
            const signer = await this.getSignerOrProvider(this.chainIds[i],true);

            if(this.chainIds[i] == 11155111){
                borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signer);
            }else if(this.chainIds[i] == 80001){
                borrowingContract = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signer);
            }

            // Get the current eth price
            const currentEthPrice = await borrowingContract.getUSDValue();
            //Get the LTV
            const ltv = await borrowingContract.getLTV();
            const ethPrice = currentEthPrice.toNumber()/100;

            // If ltv is less than 90,liquidate the positions
            if(ltv <= 90){
                if(liquidationPositionsFromBatch && liquidationPositionsFromBatch.deposits.length != 0){
                    liquidationPositionsFromBatch.deposits.map(async (liquidationPosition) =>{
                        // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
                        if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
                            // Call the liquidate function in blockchain
                            await borrowingContract.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
                            // Update the status of the position as Liquidated
                            liquidationPosition.status = PositionStatus.LIQUIDATED;
                            const chainId = liquidationPosition.chainId;      
                            borrowingContract.on('Liquidate',async (index,liquidationAmount,profits,ethAmount,availableLiquidationAmount) => {
                                const liquidationInfo = this.liquidationInfoRepository.create({
                                    chainId:chainId,
                                    index,
                                    liquidationAmount,
                                    profits,
                                    ethAmount,
                                    availableLiquidationAmount,
                                })
                                await this.liquidationInfoRepository.save(liquidationInfo);
                                //Update the liquidationIndex i.e no of liquidations done so far
                                await this.globalService.setLiquidationIndex(chainId,index);
                                const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);
                                // Update the amint and liquidation amount balance in treasury
                                await this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) - parseFloat(liquidationAmount))
                                await this.globalService.setTotalAvailableLiquidationAmount(chainId,availableLiquidationAmount);
                            })
                        }
                    })
                    // Update the position data
                    await this.batchRepository.save(liquidationPositionsFromBatch);
                    await this.borrowRepository.save(liquidationPositionsFromBatch.deposits);
                }
            }else{
                // Getting all the entities in High LTV positions
                const existingEntities = await this.highLtvPositionsRepository.find();
    
                // Create entities in HighLtvPositions
                const highLtvPositions = liquidationPositionsFromBatch.deposits.map(position =>{
                    const highLtvPosition = new HighLTVPositions();
                    highLtvPosition.batchNo = position.batchNo;
                    highLtvPosition.chainId = this.chainIds[i];
                    highLtvPosition.positionId = position.id;
                    highLtvPosition.address = position.address;
                    highLtvPosition.index = position.index;
                    highLtvPosition.status = position.status;
                    return highLtvPosition;
                })
                // Check whether the positions are already not stored 
                const liquidationPositions = highLtvPositions.filter(highLtvPosition => !existingEntities.some(existingEntity => existingEntity.positionId === highLtvPosition.positionId));
                // Save them
                await this.highLtvPositionsRepository.save(liquidationPositions);
            }
        }
        // // Get current batch number
        // const currentBatchnNoMumbai = await this.globalService.getBatchNo(80001);
        // const currentBatchnNoSepolia = await this.globalService.getBatchNo(11155111);
        // let liquidationPositionsMumbaiFromBatch:Batch;
        // let liquidationPositionsSepoliaFromBatch:Batch;

        // if(currentBatchnNoMumbai > 30){
        //     // Getting positions based on batch number starting from 1
        //     liquidationPositionsMumbaiFromBatch = await this.batchRepository.findOne({where:{
        //         chainId:80001,
        //         batchNo:Equal(currentBatchnNoMumbai - 30)
        //     }});
        // }
        // if(currentBatchnNoSepolia > 30){
        //     // Getting positions based on batch number starting from 1
        //     liquidationPositionsSepoliaFromBatch = await this.batchRepository.findOne({where:{
        //         chainId:11155111,
        //         batchNo:Equal(currentBatchnNoSepolia - 30)
        //     }});
        // }

        // const positionsMumbaiFromHighLtv = await this.highLtvPositionsRepository.findBy({
        //     chainId:80001
        // });
        // const positionsSepoliaFromHighLtv = await this.highLtvPositionsRepository.findBy({
        //     chainId:11155111
        // });

        // let liquidationPositionsMumbaiFromHighLtv:BorrowInfo[];
        // let liquidationPositionsSepoliaFromHighLtv:BorrowInfo[];

        // for(let i=0;i<positionsMumbaiFromHighLtv.length;i++){
        //     if(!liquidationPositionsMumbaiFromHighLtv){
        //         liquidationPositionsMumbaiFromHighLtv = [await this.borrowRepository.findOne({where:
        //             {id:Equal(positionsMumbaiFromHighLtv[i].positionId)}})]
        //     }else{
        //         liquidationPositionsMumbaiFromHighLtv.push(await this.borrowRepository.findOne({where:
        //             {id:Equal(positionsMumbaiFromHighLtv[i].positionId)}
        //         }));
        //     }
        // }

        // for(let i=0;i<positionsSepoliaFromHighLtv.length;i++){
        //     if(!liquidationPositionsSepoliaFromHighLtv){
        //         liquidationPositionsSepoliaFromHighLtv = [await this.borrowRepository.findOne({where:
        //             {id:Equal(positionsSepoliaFromHighLtv[i].positionId)}})]
        //     }else{
        //         liquidationPositionsSepoliaFromHighLtv.push(await this.borrowRepository.findOne({where:
        //             {id:Equal(positionsSepoliaFromHighLtv[i].positionId)}
        //         }));
        //     }
        // }

        // let liquidationPositionsMumbai:BorrowInfo[];
        // let liquidationPositionsSepolia:BorrowInfo[];

        // liquidationPositionsMumbai = liquidationPositionsMumbaiFromBatch.deposits.concat(liquidationPositionsMumbaiFromHighLtv);
        // liquidationPositionsSepolia = liquidationPositionsSepoliaFromBatch.deposits.concat(liquidationPositionsSepoliaFromHighLtv);

        // const signerMumbai = await this.getSignerOrProvider(80001,true);
        // const borrowingContractMumbai = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signerMumbai);

        // const signerSepolia = await this.getSignerOrProvider(11155111,true);
        // const borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signerSepolia);

        // // Get the current eth price
        // const currentEthPrice = await borrowingContractMumbai.getUSDValue();

        // //Get the LTV
        // const ltv = await borrowingContractMumbai.getLTV();
        // const ethPrice = currentEthPrice.toNumber()/100;

        // // If ltv is less than 90,liquidate the positions
        // if(ltv <= 90){
        //     if(liquidationPositionsMumbaiFromBatch && liquidationPositionsMumbaiFromBatch.deposits.length != 0){
        //         liquidationPositionsMumbaiFromBatch.deposits.map(async (liquidationPosition) =>{
        //             // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
        //             if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
        //                 // Call the liquidate function in blockchain
        //                 await borrowingContractMumbai.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
        //                 // Update the status of the position as Liquidated
        //                 liquidationPosition.status = PositionStatus.LIQUIDATED;
        //             }else{
        //                 return;
        //             }
        //         })
        //         // Update the position data
        //         await this.batchRepository.save(liquidationPositionsMumbaiFromBatch);
        //         await this.borrowRepository.save(liquidationPositionsMumbaiFromBatch.deposits);
        //     }

        //     if(liquidationPositionsSepoliaFromBatch && liquidationPositionsSepoliaFromBatch.deposits.length != 0){
        //         liquidationPositionsSepoliaFromBatch.deposits.map(async (liquidationPosition) =>{
        //             // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
        //             if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
        //                 // Call the liquidate function in blockchain
        //                 await borrowingContractSepolia.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
        //                 // Update the status of the position as Liquidated
        //                 liquidationPosition.status = PositionStatus.LIQUIDATED;
        //             }else{
        //                 return;
        //             }
        //         })
        //         // Update the position data
        //         await this.batchRepository.save(liquidationPositionsSepoliaFromBatch);
        //         await this.borrowRepository.save(liquidationPositionsSepoliaFromBatch.deposits);
        //     }


        //     // liquidationPositionsMumbaiFromHighLtv.map(async (liquidationPosition) =>{
        //     //     if(liquidationPosition.liquidationEthPrice == ethPrice && !liquidationPosition.downsideProtectionStatus){
        //     //         await borrowingContractMumbai.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
        //     //         liquidationPosition.status = PositionStatus.LIQUIDATED;
        //     //     }else{
        //     //         return;
        //     //     }
        //     // })
    
        //     // liquidationPositionsSepoliaFromHighLtv.map(async (liquidationPosition) =>{
        //     //     if(liquidationPosition.liquidationEthPrice == ethPrice && !liquidationPosition.downsideProtectionStatus){
        //     //         await borrowingContractSepolia.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
        //     //         liquidationPosition.status = PositionStatus.LIQUIDATED;
        //     //     }else{
        //     //         return;
        //     //     }
        //     // })
        // }else{
        //     // Getting all the entities in High LTV positions
        //     const existingEntities = await this.highLtvPositionsRepository.find();

        //     // Create entities in HighLtvPositions
        //     const highLtvPositionsMumbai = liquidationPositionsMumbaiFromBatch.deposits.map(position =>{
        //         const highLtvPositionMumbai = new HighLTVPositions();
        //         highLtvPositionMumbai.batchNo = position.batchNo;
        //         highLtvPositionMumbai.chainId = 80001;
        //         highLtvPositionMumbai.positionId = position.id;
        //         highLtvPositionMumbai.address = position.address;
        //         highLtvPositionMumbai.index = position.index;
        //         highLtvPositionMumbai.status = position.status;
        //         return highLtvPositionMumbai;
        //     })
        //     const highLtvPositionsSepolia = liquidationPositionsSepoliaFromBatch.deposits.map(position =>{
        //         const highLtvPositionSepolia = new HighLTVPositions();
        //         highLtvPositionSepolia.batchNo = position.batchNo;
        //         highLtvPositionSepolia.chainId = 11155111;
        //         highLtvPositionSepolia.positionId = position.id;
        //         highLtvPositionSepolia.address = position.address;
        //         highLtvPositionSepolia.index = position.index;
        //         highLtvPositionSepolia.status = position.status;
        //         return highLtvPositionSepolia;
        //     })

        //     // Combination of high ltv positions in all chains
        //     const combinedHighLtvPositions = highLtvPositionsMumbai.concat(highLtvPositionsSepolia);
        //     // Check whether the positions are already not stored 
        //     const liquidationPositions = combinedHighLtvPositions.filter(combinedPosition => !existingEntities.some(existingEntity => existingEntity.positionId === combinedPosition.positionId));
        //     // Save them
        //     await this.highLtvPositionsRepository.save(liquidationPositions);
        // }

    }

    //For every 5 minuts,check whether the high ltv positions are eligible for liquidation
    @Cron(CronExpression.EVERY_5_MINUTES)
    // @Cron("0 */1 * * * *")
    async liquidateHighLtvUsers(){

        for (let i = 0;i < this.chainIds.length;i++){
            let borrowingContract;
            const signer = await this.getSignerOrProvider(this.chainIds[i],true);

            if(this.chainIds[i] == 11155111){
                borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signer);
            }else if(this.chainIds[i] == 80001){
                borrowingContract = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signer);
            }

            // Get the current eth price
            const currentEthPrice = await borrowingContract.getUSDValue();
            // Get the current ltv
            const ltv = await borrowingContract.getLTV();
            const ethPrice = currentEthPrice.toNumber()/100;

            // If ltv is below 90 liquidate
            if(ltv <= 90){
                // Get the positions based on status of the position
                const positionsFromHighLtv = await this.highLtvPositionsRepository.findBy({
                    chainId:this.chainIds[i],
                    status:Not(PositionStatus.LIQUIDATED)
                });

                let liquidationPositionsFromHighLtv:BorrowInfo[];
                if(positionsFromHighLtv && positionsFromHighLtv.length != 0){
                    // get the equivalent BorrowInfo
                    for(let i=0;i<positionsFromHighLtv.length;i++){
                        if(!liquidationPositionsFromHighLtv){
                            liquidationPositionsFromHighLtv = [await this.borrowRepository.findOne({where:
                                {id:Equal(positionsFromHighLtv[i].positionId)}})]
                        }else{
                            liquidationPositionsFromHighLtv.push(await this.borrowRepository.findOne({where:
                                {id:Equal(positionsFromHighLtv[i].positionId)}
                            }));
                        }
                    }
                }

                if(liquidationPositionsFromHighLtv && liquidationPositionsFromHighLtv.length != 0){
                    liquidationPositionsFromHighLtv.map(async (liquidationPosition) =>{
                        // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
                        if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
                            // Call the liquidate function in blockchain
                            await borrowingContract.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
                            // Get the equivalent high ltv position
                            const liquidatedPosition = await this.highLtvPositionsRepository.findOne({where:
                                {positionId:Equal(liquidationPosition.id)}})
                            // Update the status of the position as Liquidated
                            liquidatedPosition.status = PositionStatus.LIQUIDATED;
                            liquidationPosition.status = PositionStatus.LIQUIDATED;
                            const chainId = liquidationPosition.chainId;      
                            borrowingContract.on('Liquidate',async (index,liquidationAmount,profits,ethAmount,availableLiquidationAmount) => {
                                const liquidationInfo = this.liquidationInfoRepository.create({
                                    chainId:chainId,
                                    index,
                                    liquidationAmount,
                                    profits,
                                    ethAmount,
                                    availableLiquidationAmount,
                                })
                                await this.liquidationInfoRepository.save(liquidationInfo);
                                //Update the liquidationIndex i.e no of liquidations done so far
                                await this.globalService.setLiquidationIndex(chainId,index);
                                const amintBalance = await this.globalService.getTreasuryAmintBalance(chainId);
                                // Update the amint and liquidation amount balance in treasury
                                await this.globalService.setTreasuryAmintBalance(chainId,parseFloat(amintBalance.toString()) - parseFloat(liquidationAmount))
                                await this.globalService.setTotalAvailableLiquidationAmount(chainId,availableLiquidationAmount);
                            })
                            // Update the data
                            await this.highLtvPositionsRepository.save(liquidatedPosition);
                        }
                    })
                    await this.borrowRepository.save(liquidationPositionsFromHighLtv);
                }
            }
        }
        

        // const signerMumbai = await this.getSignerOrProvider(80001,true);
        // const borrowingContractMumbai = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signerMumbai);

        // const signerSepolia = await this.getSignerOrProvider(11155111,true);
        // const borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signerSepolia);

        // // Get the current eth price
        // const currentEthPrice = await borrowingContractMumbai.getUSDValue();
        // // Get the current ltv
        // const ltv = await borrowingContractMumbai.getLTV();
        // const ethPrice = currentEthPrice.toNumber()/100;

        // // If ltv is below 90 liquidate
        // if(ltv <= 90){
        //     // Get the positions based on status of the position
        //     const positionsMumbaiFromHighLtv = await this.highLtvPositionsRepository.findBy({
        //         chainId:80001,
        //         status:Not(PositionStatus.LIQUIDATED)
        //     });

        //     const positionsSepoliaFromHighLtv = await this.highLtvPositionsRepository.findBy({
        //         chainId:11155111,
        //         status:Not(PositionStatus.LIQUIDATED)
        //     });

        //     let liquidationPositionsMumbaiFromHighLtv:BorrowInfo[];
        //     let liquidationPositionsSepoliaFromHighLtv:BorrowInfo[];
        //     if(positionsMumbaiFromHighLtv && positionsMumbaiFromHighLtv.length != 0){
        //         // get the equivalent BorrowInfo
        //         for(let i=0;i<positionsMumbaiFromHighLtv.length;i++){
        //             if(!liquidationPositionsMumbaiFromHighLtv){
        //                 liquidationPositionsMumbaiFromHighLtv = [await this.borrowRepository.findOne({where:
        //                     {id:Equal(positionsMumbaiFromHighLtv[i].positionId)}})]
        //             }else{
        //                 liquidationPositionsMumbaiFromHighLtv.push(await this.borrowRepository.findOne({where:
        //                     {id:Equal(positionsMumbaiFromHighLtv[i].positionId)}
        //                 }));
        //             }
        //         }
        //     }

        //     if(positionsSepoliaFromHighLtv && positionsSepoliaFromHighLtv.length != 0){
        //         // get the equivalent BorrowInfo
        //         for(let i=0;i<positionsSepoliaFromHighLtv.length;i++){
        //             if(!liquidationPositionsSepoliaFromHighLtv){
        //                 liquidationPositionsSepoliaFromHighLtv = [await this.borrowRepository.findOne({where:
        //                     {id:Equal(positionsSepoliaFromHighLtv[i].positionId)}})]
        //             }else{
        //                 liquidationPositionsSepoliaFromHighLtv.push(await this.borrowRepository.findOne({where:
        //                     {id:Equal(positionsSepoliaFromHighLtv[i].positionId)}
        //                 }));
        //             }
        //         }
        //     }

        //     if(liquidationPositionsMumbaiFromHighLtv && liquidationPositionsMumbaiFromHighLtv.length != 0){
        //         liquidationPositionsMumbaiFromHighLtv.map(async (liquidationPosition) =>{
        //             // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
        //             if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
        //                 // Call the liquidate function in blockchain
        //                 //await borrowingContractMumbai.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
        //                 // Get the equivalent high ltv position
        //                 const liquidatedPosition = await this.highLtvPositionsRepository.findOne({where:
        //                     {positionId:Equal(liquidationPosition.id)}})
        //                 // Update the status of the position as Liquidated
        //                 liquidatedPosition.status = PositionStatus.LIQUIDATED;
        //                 liquidationPosition.status = PositionStatus.LIQUIDATED;
        //                 // Update the data
        //                 await this.highLtvPositionsRepository.save(liquidatedPosition);
        //             }else{
        //                 return;
        //             }
        //         })
        //         await this.borrowRepository.save(liquidationPositionsMumbaiFromHighLtv);

        //     }

        //     if(liquidationPositionsSepoliaFromHighLtv && liquidationPositionsSepoliaFromHighLtv.length != 0){
        //         liquidationPositionsSepoliaFromHighLtv.map(async (liquidationPosition) =>{
        //             // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
        //             if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
        //                 // Call the liquidate function in blockchain
        //                 //await borrowingContractSepolia.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
        //                 // Get the equivalent high ltv position
        //                 const liquidatedPosition = await this.highLtvPositionsRepository.findOne({where:
        //                     {positionId:Equal(liquidationPosition.id)}})
        //                 // Update the status of the position as Liquidated
        //                 liquidatedPosition.status = PositionStatus.LIQUIDATED;
        //                 liquidationPosition.status = PositionStatus.LIQUIDATED;
        //                 // Update the data
        //                 await this.highLtvPositionsRepository.save(liquidatedPosition);
        //             }else{
        //                 return;
        //             }
        //         })
        //         await this.borrowRepository.save(liquidationPositionsSepoliaFromHighLtv);

        //     }

        // }else{
        //     return;
        // }
    }
}
