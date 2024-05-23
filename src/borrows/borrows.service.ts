import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus, ProtocolFunction } from './borrow-status.enum';
import { AddBorrowDto } from './dto/create-borrow.dto';
import { GetBorrowFilterDto } from './dto/get-borrow-filter.dto';
import { BorrowInfo } from './entities/borrow.entity';
import { Repository,Equal,Not,MoreThanOrEqual } from 'typeorm';
import { ethers,Contract,ZeroAddress, NonceManager } from 'ethers';
import { BorrowerInfo } from './entities/borrower.entity';
import { WithdrawDto } from './dto/withdraw.dto';
import { GetBorrowDeposit } from './dto/get-borrow-deposit.dto';
import { CriticalPositions } from './entities/liquidation.entity';
import { bybit } from 'ccxt';
import { Options } from '@layerzerolabs/lz-v2-utilities';

import {
    borrowAddressSepolia,borrowAddressBaseSepolia,
    cdsAddressSepolia,cdsAddressBaseSepolia,
    treasuryAddressSepolia,treasuryAddressBaseSepolia,
    optionsAddressSepolia,optionsAddressBaseSepolia,
    poolAddressSepolia,
    borrowABI,cdsABI,treasuryABI,optionsABI,poolABI,
    eidSepolia,eidBaseSepolia

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

    private chainIds = [11155111,84532];

    private exchange = new bybit({
        apiKey: 'T8SLTSFrNvRowNRUuL',
        secret: '6YpoYGG4wib9BlReoisyZAT4YyG5iDQSPWb5',
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
    async getBorrowLeaderboardData():Promise<BorrowerInfo[]>{
        const data = await this.borrowerRepository.find({
            order: {
                totalAmint: 'DESC'
            },
            take: 25
        });
        return data;
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
        const withdrawAmountInEther = ethers.formatEther(withdrawAmount);
        const noOfAbondInEther = (parseFloat(noOfAbond)/1e18).toString();
        const totalDebtAmountInEther = (parseFloat(totalDebtAmount)/1e6).toString();

        if(found.status == PositionStatus.DEPOSITED){
            found.withdrawTime = withdrawTime;
            found.withdrawAmount = withdrawAmountInEther;
            found.noOfAbondMinted = parseFloat(noOfAbondInEther);
            found.totalDebtAmount = totalDebtAmountInEther;
            found.status = PositionStatus.WITHDREW;
            borrower.totalDepositedAmount = parseFloat(borrower.totalDepositedAmount.toString()) - parseFloat(found.depositedAmount);
            borrower.totalAmint = parseFloat(borrower.totalAmint.toString()) - parseFloat(found.noOfAmintMinted);
            borrower.totalAbond = parseFloat(borrower.totalAbond.toString()) +  parseFloat(noOfAbondInEther);
        }else if(found.status == PositionStatus.WITHDREW){
            throw new NotFoundException('Already Withdrawn') ; 
        }else {
            throw new NotFoundException('Position Liquidated') ;
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
    async createCriticalPositions(){

        for (let i = 0;i < this.chainIds.length;i++){
            const provider = await this.getSignerOrProvider(this.chainIds[i],false);

            let borrowingContract;

            if(this.chainIds[i] == 11155111){
                borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABI,provider);
            }else if(this.chainIds[i] == 84532){
                borrowingContract = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,provider);
            }
            const currentEthPrice = await borrowingContract.getUSDValue();
            const ethPrice = Number(currentEthPrice)/100;

            //Filtering the positions based on current eth price
            const positions = await this.borrowRepository.findBy({
                status:Not(PositionStatus.LIQUIDATED),
                criticalEthPrice:MoreThanOrEqual(ethPrice)
            });
    
            // Creating critical position by deposit data
            const criticalPositions = positions.map((position) =>{
                const criticalPosition = new CriticalPositions();
                criticalPosition.positionId = position.id
                criticalPosition.chainId = position.chainId
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
        }        
    }

    /**
     * Liquidate the positions if the position is in liquidation stages,check for every 5 minutes
     * @returns liquidated positions
     */
    @Cron(CronExpression.EVERY_5_MINUTES)
    async liquidate():Promise<CriticalPositions[]>{

        let borrowingContract;
        let cdsContract;
        let treasuryContract;
        let nativeFee = 0
        let nativeFee1 = 0
        let nativeFee2 = 0
        const options = Options.newOptions().addExecutorLzReceiveOption(500000, 0).toHex().toString()

        for (let i = 0;i < this.chainIds.length;i++){
            const signer = await this.getSignerOrProvider(this.chainIds[i],true);

            if(this.chainIds[i] == 11155111){
                borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABI,signer);
                cdsContract = new ethers.Contract(cdsAddressSepolia,cdsABI,signer);;
                treasuryContract = new ethers.Contract(treasuryAddressSepolia,treasuryABI,signer);;

                ;[nativeFee] = await cdsContract.quote(eidBaseSepolia,1,123,123,123,[0,0,0,0],0,options, false)
                ;[nativeFee1] = await borrowingContract.quote(eidBaseSepolia, [5,10,15,20,25,30,35,40], options, false)
                ;[nativeFee2] = await treasuryContract.quote(eidBaseSepolia,1, [ZeroAddress,0],[ZeroAddress,0],options, false)

            }else if(this.chainIds[i] == 84532){
                borrowingContract = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,signer);
                cdsContract = new ethers.Contract(cdsAddressBaseSepolia,cdsABI,signer);;
                treasuryContract = new ethers.Contract(treasuryAddressBaseSepolia,treasuryABI,signer);;

                ;[nativeFee] = await cdsContract.quote(eidSepolia,1,123,123,123,[0,0,0,0],0,options, false)
                ;[nativeFee1] = await borrowingContract.quote(eidSepolia, [5,10,15,20,25,30,35,40], options, false)
                ;[nativeFee2] = await treasuryContract.quote(eidSepolia,1, [ZeroAddress,0],[ZeroAddress,0],options, false)
            }

            const currentEthPrice = await borrowingContract.getUSDValue();
            console.log(currentEthPrice);
            const ethPrice = Number(currentEthPrice)/100;
            console.log(ethPrice);
            const liquidationPositions = await this.criticalPositionsRepository.findBy({
                status:Not(PositionStatus.LIQUIDATED),
                chainId:Equal(this.chainIds[i]),
                ethPriceAtLiquidation:MoreThanOrEqual(ethPrice)
            });
            if(liquidationPositions.length != 0){
                let liquidatedPositions:BorrowInfo[];
                for(let j=0;j<liquidationPositions.length;j++){
                    if(!liquidatedPositions){
                        liquidatedPositions = [await this.borrowRepository.findOne({where:
                            {id:Equal(liquidationPositions[j].positionId)}})]
                    }else{
                        liquidatedPositions.push(await this.borrowRepository.findOne({where:
                            {id:Equal(liquidationPositions[j].positionId)}
                        }));
                    }
                    liquidationPositions[j].status = PositionStatus.LIQUIDATED;
                }

                // Liquidate the positions by calling liquidation function in borrowing contract
                liquidatedPositions.map(async (liquidatedPosition) =>{
                    await borrowingContract.liquidate(
                        liquidatedPosition.address,
                        liquidatedPosition.index,
                        {value: nativeFee1 + nativeFee2 + nativeFee});
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
    }

    async getSignerOrProvider(chainId:number,needSigner = false){
        let rpcUrl:string;
        let pKey:string;
        if(chainId == 11155111){
            rpcUrl = "https://sepolia.infura.io/v3/e9cf275f1ddc4b81aa62c5aa0b11ac0f"
            pKey = 'ec619e44ab8377982c53722fbb1a39549c8e927f440f769e5c74313fb7e7eb3f'
        }else if(chainId == 84532){
            rpcUrl = "https://base-sepolia.g.alchemy.com/v2/0-Lgk-tQKxb3V75IGadDVifTUua8H0W2"
            pKey = '3cdf792b14656fcdcc415ba2fde3c7fbadacdcc887778f36e8ce98db34021e15';
        }
        const provider =  new ethers.JsonRpcProvider(rpcUrl);
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
        if(
            await this.globalService.getTotalCdsDepositedAmount(this.chainIds[0]) == 0 &&
            await this.globalService.getTotalCdsDepositedAmount(this.chainIds[1]) == 0){
            return [Math.floor(volatility),0];
        }else{
            const signer = await this.getSignerOrProvider(chainId,true);
            let optionsContract;
            if(chainId == 11155111){
                optionsContract = new ethers.Contract(optionsAddressSepolia,optionsABI,signer);
            }else if(chainId == 84532){
                optionsContract = new ethers.Contract(optionsAddressBaseSepolia,optionsABI,signer);
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
            borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABI,signer);
        }else if(chainId == 84532){
            borrowingContract = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,signer);
        }
        const ethVaultValue = await borrowingContract.omniChainBorrowing(1);
        const cdsPoolValue = await borrowingContract.omniChainBorrowing(2);
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
                poolContract = new ethers.Contract(poolAddressSepolia,poolABI,signerSepolia);

                if(this.chainIds[i] == 11155111){
                    borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABI,signer);
                }else if(this.chainIds[i] == 84532){
                    borrowingContract = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,signer);
                }
                const currentEthPrice = await borrowingContract.getUSDValue();
                const optionfees = await this.getEthVolatility(this.chainIds[i],(ethers.parseEther('1')).toString(),currentEthPrice,0);
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

    // // Runs every day
    // @Cron('0 0 0/24 * * *',{name:'Create chart data'})
    // // @Cron(CronExpression.EVERY_10_SECONDS,{name:'Create chart data'})
    // async createAmintPriceChart(){
    //     for (let i = 0;i < this.chainIds.length;i++){

    //         const signerSepolia = await this.getSignerOrProvider(11155111,true);

    //         let poolContract;
    //         poolContract = new ethers.Contract(poolAddressSepolia,poolABI,signerSepolia);
    //         const slot0 = await poolContract.slot0();

    //         let newChart:AmintPrice
    //         let found = await this.daysRepository.findOne({where:{chainId:this.chainIds[i]}});

    //         if(!found){
    //             found = new Days();
    //             found.chainId = this.chainIds[i]
    //             found.days = 1

    //             newChart = this.amintPriceRepository.create({
    //                 chainId:this.chainIds[i],
    //                 day:1,
    //                 amintPrice:this.getAmintPrice(slot0[0]),
    //             })
    //         }else{
    //             newChart = this.amintPriceRepository.create({
    //                 chainId:this.chainIds[i],
    //                 day:parseInt(found? (found.days).toString() : '0') + 1,
    //                 amintPrice:this.getAmintPrice(slot0[0]),
    //             })
    
    //             found.days = parseInt(found.days? (found.days).toString() : '0') + 1;
    //         }

    //         await this.amintPriceRepository.save(newChart);
    //         await this.daysRepository.save(found);
    //     }
    // }

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
    //     const signerBaseSepolia = await this.getSignerOrProvider(84532,true);
    //     const optionsContractBaseSepolia = new ethers.Contract(optionsAddressBaseSepolia,optionsABIBaseSepolia,signerBaseSepolia);
    //     const signerSepolia = await this.getSignerOrProvider(11155111,true);
    //     const optionsContractSepolia = new ethers.Contract(optionsAddressSepolia,optionsABISepolia,signerSepolia);
    //     const abc = await this.exchange.fetchVolatilityHistory('ETH',{period:30});
    //     const volatility = abc.map(item => item.info[0].value)[0];
    //     let optionsFeesBaseSepolia;
    //     let optionsFeesSepolia;
    //     //Get the option fees for all strike prices
    //     for(let i=0;i<5;i++){
    //         if(!optionsFeesBaseSepolia){
    //             optionsFeesBaseSepolia = [await optionsContractBaseSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i)]
    //         }else if(!optionsFeesSepolia){
    //             optionsFeesSepolia = [await optionsContractSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i)]
    //         }else {
    //             optionsFeesBaseSepolia.push(await optionsContractBaseSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i));
    //             optionsFeesSepolia.push(await optionsContractSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i));
    //         }
    //         optionsFeesBaseSepolia.push(await optionsContractBaseSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i));
    //         optionsFeesSepolia.push(await optionsContractSepolia.calculateOptionPrice(volatility,ethers.utils.parseEther('1'),i));
    //     }

    //     // Filter the deposits based on chainId and status of the deposit
    //     const activePositionsSepolia = await this.borrowRepository.findBy(
    //         {
    //             chainId:Equal(11155111),
    //             status:Equal(PositionStatus.DEPOSITED)
    //         });
    //     const activePositionsBaseSepolia = await this.borrowRepository.findBy(
    //         {                    
    //             chainId:Equal(84532),
    //             status:Equal(PositionStatus.DEPOSITED)
    //         });
    //     //Loop through all the deposits and deduct option fees based on their strike prices and deposited amount
    //     for(let i=0;i<5;i++){
    //         if(activePositionsBaseSepolia.length != 0){
    //             activePositionsBaseSepolia.map(activePosition =>{
    //                 if(Object.keys(StrikePricePercent).indexOf(activePosition.strikePricePercent) == i){
    //                     activePosition.totalFeesDeducted = (parseFloat(activePosition.totalFeesDeducted) + ((optionsFeesBaseSepolia[i] * parseFloat(activePosition.depositedAmount))/30)).toString();
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
    //     await this.borrowRepository.save(activePositionsBaseSepolia);
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
        // const currentBatchnNoBaseSepolia = await this.globalService.getBatchNo(84532);
        // const currentBatchnNoSepolia = await this.globalService.getBatchNo(11155111);
        // //If current batch number is less than or equal to 30,return
        // if(currentBatchnNoBaseSepolia > 30){
        //     // Getting positions based on batch number starting from 1
        //     const updatingPositionsBaseSepolia = await this.batchRepository.findOne({where:{
        //         chainId:84532,
        //         batchNo:Equal(currentBatchnNoBaseSepolia - 30)
        //     }});

        //     // If the status of the position is deposited only,then update the liquidationEthPrice
        //     updatingPositionsBaseSepolia.deposits.map(updatingPosition =>{
        //         if(updatingPosition.status == PositionStatus.DEPOSITED){
        //             updatingPosition.downsideProtectionStatus = false;
        //             updatingPosition.liquidationEthPrice = (updatingPosition.ethPrice * 90)/100;            
        //         }
        //     })
        //     // Update the changes
        //     await this.borrowRepository.save(updatingPositionsBaseSepolia.deposits);
        //     await this.batchRepository.save(updatingPositionsBaseSepolia);
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
            let cdsContract;
            let treasuryContract;
            let nativeFee = 0
            let nativeFee1 = 0
            let nativeFee2 = 0
            const options = Options.newOptions().addExecutorLzReceiveOption(500000, 0).toHex().toString()
            const signer = await this.getSignerOrProvider(this.chainIds[i],true);

            if(this.chainIds[i] == 11155111){
                borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABI,signer);
                cdsContract = new ethers.Contract(cdsAddressSepolia,cdsABI,signer);;
                treasuryContract = new ethers.Contract(treasuryAddressSepolia,treasuryABI,signer);;

                ;[nativeFee] = await cdsContract.quote(eidSepolia,1,123,123,123,[0,0,0,0],0,options, false)
                ;[nativeFee1] = await borrowingContract.quote(eidSepolia, [5,10,15,20,25,30,35,40], options, false)
                ;[nativeFee2] = await treasuryContract.quote(eidSepolia,1, [ZeroAddress,0],[ZeroAddress,0],options, false)

            }else if(this.chainIds[i] == 84532){
                borrowingContract = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,signer);
                cdsContract = new ethers.Contract(cdsAddressBaseSepolia,cdsABI,signer);;
                treasuryContract = new ethers.Contract(treasuryAddressBaseSepolia,treasuryABI,signer);;

                ;[nativeFee] = await cdsContract.quote(eidSepolia,1,123,123,123,[0,0,0,0],0,options, false)
                ;[nativeFee1] = await borrowingContract.quote(eidSepolia, [5,10,15,20,25,30,35,40], options, false)
                ;[nativeFee2] = await treasuryContract.quote(eidSepolia,1, [ZeroAddress,0],[ZeroAddress,0],options, false)
            }

            // Get the current eth price
            const currentEthPrice = await borrowingContract.getUSDValue();
            //Get the LTV
            const ltv = await borrowingContract.getLTV();
            const ethPrice = Number(currentEthPrice)/100;

            // If ltv is less than 90,liquidate the positions
            if(ltv <= 90){
                if(liquidationPositionsFromBatch && liquidationPositionsFromBatch.deposits.length != 0){
                    liquidationPositionsFromBatch.deposits.map(async (liquidationPosition) =>{
                        // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
                        if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
                            // Call the liquidate function in blockchain
                            await borrowingContract.liquidate(
                                liquidationPosition.address,
                                liquidationPosition.index,
                                {value: nativeFee1 + nativeFee2 + nativeFee});
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
        // const currentBatchnNoBaseSepolia = await this.globalService.getBatchNo(84532);
        // const currentBatchnNoSepolia = await this.globalService.getBatchNo(11155111);
        // let liquidationPositionsBaseSepoliaFromBatch:Batch;
        // let liquidationPositionsSepoliaFromBatch:Batch;

        // if(currentBatchnNoBaseSepolia > 30){
        //     // Getting positions based on batch number starting from 1
        //     liquidationPositionsBaseSepoliaFromBatch = await this.batchRepository.findOne({where:{
        //         chainId:84532,
        //         batchNo:Equal(currentBatchnNoBaseSepolia - 30)
        //     }});
        // }
        // if(currentBatchnNoSepolia > 30){
        //     // Getting positions based on batch number starting from 1
        //     liquidationPositionsSepoliaFromBatch = await this.batchRepository.findOne({where:{
        //         chainId:11155111,
        //         batchNo:Equal(currentBatchnNoSepolia - 30)
        //     }});
        // }

        // const positionsBaseSepoliaFromHighLtv = await this.highLtvPositionsRepository.findBy({
        //     chainId:84532
        // });
        // const positionsSepoliaFromHighLtv = await this.highLtvPositionsRepository.findBy({
        //     chainId:11155111
        // });

        // let liquidationPositionsBaseSepoliaFromHighLtv:BorrowInfo[];
        // let liquidationPositionsSepoliaFromHighLtv:BorrowInfo[];

        // for(let i=0;i<positionsBaseSepoliaFromHighLtv.length;i++){
        //     if(!liquidationPositionsBaseSepoliaFromHighLtv){
        //         liquidationPositionsBaseSepoliaFromHighLtv = [await this.borrowRepository.findOne({where:
        //             {id:Equal(positionsBaseSepoliaFromHighLtv[i].positionId)}})]
        //     }else{
        //         liquidationPositionsBaseSepoliaFromHighLtv.push(await this.borrowRepository.findOne({where:
        //             {id:Equal(positionsBaseSepoliaFromHighLtv[i].positionId)}
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

        // let liquidationPositionsBaseSepolia:BorrowInfo[];
        // let liquidationPositionsSepolia:BorrowInfo[];

        // liquidationPositionsBaseSepolia = liquidationPositionsBaseSepoliaFromBatch.deposits.concat(liquidationPositionsBaseSepoliaFromHighLtv);
        // liquidationPositionsSepolia = liquidationPositionsSepoliaFromBatch.deposits.concat(liquidationPositionsSepoliaFromHighLtv);

        // const signerBaseSepolia = await this.getSignerOrProvider(84532,true);
        // const borrowingContractBaseSepolia = new ethers.Contract(borrowAddressBaseSepolia,borrowABIBaseSepolia,signerBaseSepolia);

        // const signerSepolia = await this.getSignerOrProvider(11155111,true);
        // const borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signerSepolia);

        // // Get the current eth price
        // const currentEthPrice = await borrowingContractBaseSepolia.getUSDValue();

        // //Get the LTV
        // const ltv = await borrowingContractBaseSepolia.getLTV();
        // const ethPrice = currentEthPrice.toNumber()/100;

        // // If ltv is less than 90,liquidate the positions
        // if(ltv <= 90){
        //     if(liquidationPositionsBaseSepoliaFromBatch && liquidationPositionsBaseSepoliaFromBatch.deposits.length != 0){
        //         liquidationPositionsBaseSepoliaFromBatch.deposits.map(async (liquidationPosition) =>{
        //             // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
        //             if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
        //                 // Call the liquidate function in blockchain
        //                 await borrowingContractBaseSepolia.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
        //                 // Update the status of the position as Liquidated
        //                 liquidationPosition.status = PositionStatus.LIQUIDATED;
        //             }else{
        //                 return;
        //             }
        //         })
        //         // Update the position data
        //         await this.batchRepository.save(liquidationPositionsBaseSepoliaFromBatch);
        //         await this.borrowRepository.save(liquidationPositionsBaseSepoliaFromBatch.deposits);
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


        //     // liquidationPositionsBaseSepoliaFromHighLtv.map(async (liquidationPosition) =>{
        //     //     if(liquidationPosition.liquidationEthPrice == ethPrice && !liquidationPosition.downsideProtectionStatus){
        //     //         await borrowingContractBaseSepolia.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
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
        //     const highLtvPositionsBaseSepolia = liquidationPositionsBaseSepoliaFromBatch.deposits.map(position =>{
        //         const highLtvPositionBaseSepolia = new HighLTVPositions();
        //         highLtvPositionBaseSepolia.batchNo = position.batchNo;
        //         highLtvPositionBaseSepolia.chainId = 84532;
        //         highLtvPositionBaseSepolia.positionId = position.id;
        //         highLtvPositionBaseSepolia.address = position.address;
        //         highLtvPositionBaseSepolia.index = position.index;
        //         highLtvPositionBaseSepolia.status = position.status;
        //         return highLtvPositionBaseSepolia;
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
        //     const combinedHighLtvPositions = highLtvPositionsBaseSepolia.concat(highLtvPositionsSepolia);
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
            let cdsContract;
            let treasuryContract;
            let nativeFee = 0
            let nativeFee1 = 0
            let nativeFee2 = 0
            const options = Options.newOptions().addExecutorLzReceiveOption(500000, 0).toHex().toString()
            const signer = await this.getSignerOrProvider(this.chainIds[i],true);

            if(this.chainIds[i] == 11155111){
                borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABI,signer);
                cdsContract = new ethers.Contract(cdsAddressSepolia,cdsABI,signer);;
                treasuryContract = new ethers.Contract(treasuryAddressSepolia,treasuryABI,signer);;

                ;[nativeFee] = await cdsContract.quote(eidBaseSepolia,1,123,123,123,[0,0,0,0],0,options, false)
                ;[nativeFee1] = await borrowingContract.quote(eidBaseSepolia, [5,10,15,20,25,30,35,40], options, false)
                ;[nativeFee2] = await treasuryContract.quote(eidBaseSepolia,1, [ZeroAddress,0],[ZeroAddress,0],options, false)

            }else if(this.chainIds[i] == 84532){
                borrowingContract = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,signer);
                cdsContract = new ethers.Contract(cdsAddressBaseSepolia,cdsABI,signer);;
                treasuryContract = new ethers.Contract(treasuryAddressBaseSepolia,treasuryABI,signer);;

                ;[nativeFee] = await cdsContract.quote(eidSepolia,1,123,123,123,[0,0,0,0],0,options, false)
                ;[nativeFee1] = await borrowingContract.quote(eidSepolia, [5,10,15,20,25,30,35,40], options, false)
                ;[nativeFee2] = await treasuryContract.quote(eidSepolia,1, [ZeroAddress,0],[ZeroAddress,0],options, false)
            }

            // Get the current eth price
            const currentEthPrice = await borrowingContract.getUSDValue();
            // Get the current ltv
            const ltv = await borrowingContract.getLTV();
            const ethPrice = Number(currentEthPrice)/100;

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
                    for(let j=0;j<positionsFromHighLtv.length;j++){
                        if(!liquidationPositionsFromHighLtv){
                            liquidationPositionsFromHighLtv = [await this.borrowRepository.findOne({where:
                                {id:Equal(positionsFromHighLtv[j].positionId)}})]
                        }else{
                            liquidationPositionsFromHighLtv.push(await this.borrowRepository.findOne({where:
                                {id:Equal(positionsFromHighLtv[j].positionId)}
                            }));
                        }
                    }
                }

                if(liquidationPositionsFromHighLtv && liquidationPositionsFromHighLtv.length != 0){
                    liquidationPositionsFromHighLtv.map(async (liquidationPosition) =>{
                        // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
                        if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
                            // Call the liquidate function in blockchain
                            await borrowingContract.liquidate(
                                liquidationPosition.address,
                                liquidationPosition.index,
                                {value: nativeFee1 + nativeFee2 + nativeFee});
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
        

        // const signerBaseSepolia = await this.getSignerOrProvider(84532,true);
        // const borrowingContractBaseSepolia = new ethers.Contract(borrowAddressBaseSepolia,borrowABIBaseSepolia,signerBaseSepolia);

        // const signerSepolia = await this.getSignerOrProvider(11155111,true);
        // const borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signerSepolia);

        // // Get the current eth price
        // const currentEthPrice = await borrowingContractBaseSepolia.getUSDValue();
        // // Get the current ltv
        // const ltv = await borrowingContractBaseSepolia.getLTV();
        // const ethPrice = currentEthPrice.toNumber()/100;

        // // If ltv is below 90 liquidate
        // if(ltv <= 90){
        //     // Get the positions based on status of the position
        //     const positionsBaseSepoliaFromHighLtv = await this.highLtvPositionsRepository.findBy({
        //         chainId:84532,
        //         status:Not(PositionStatus.LIQUIDATED)
        //     });

        //     const positionsSepoliaFromHighLtv = await this.highLtvPositionsRepository.findBy({
        //         chainId:11155111,
        //         status:Not(PositionStatus.LIQUIDATED)
        //     });

        //     let liquidationPositionsBaseSepoliaFromHighLtv:BorrowInfo[];
        //     let liquidationPositionsSepoliaFromHighLtv:BorrowInfo[];
        //     if(positionsBaseSepoliaFromHighLtv && positionsBaseSepoliaFromHighLtv.length != 0){
        //         // get the equivalent BorrowInfo
        //         for(let i=0;i<positionsBaseSepoliaFromHighLtv.length;i++){
        //             if(!liquidationPositionsBaseSepoliaFromHighLtv){
        //                 liquidationPositionsBaseSepoliaFromHighLtv = [await this.borrowRepository.findOne({where:
        //                     {id:Equal(positionsBaseSepoliaFromHighLtv[i].positionId)}})]
        //             }else{
        //                 liquidationPositionsBaseSepoliaFromHighLtv.push(await this.borrowRepository.findOne({where:
        //                     {id:Equal(positionsBaseSepoliaFromHighLtv[i].positionId)}
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

        //     if(liquidationPositionsBaseSepoliaFromHighLtv && liquidationPositionsBaseSepoliaFromHighLtv.length != 0){
        //         liquidationPositionsBaseSepoliaFromHighLtv.map(async (liquidationPosition) =>{
        //             // Liquidate only if current eth price == liquidationEthPrice and downsideProtectionStatus is false
        //             if(liquidationPosition.liquidationEthPrice >= ethPrice && !liquidationPosition.downsideProtectionStatus){
        //                 // Call the liquidate function in blockchain
        //                 //await borrowingContractBaseSepolia.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
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
        //         await this.borrowRepository.save(liquidationPositionsBaseSepoliaFromHighLtv);

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

    async listenEvents(chainId:number,protocolFunction:ProtocolFunction):Promise<number[]> {

        let borrowingContract: Contract;
        let cdsContract: Contract;
        if(chainId == 11155111){
            const signer = await this.getSignerOrProvider(chainId,true);

            borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABI,signer);
            cdsContract = new ethers.Contract(cdsAddressSepolia,cdsABI,signer);;

        }else if(chainId == 84532){
            const signer = await this.getSignerOrProvider(chainId,true);
            borrowingContract = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,signer);
            cdsContract = new ethers.Contract(cdsAddressBaseSepolia,cdsABI,signer);

        }

        let result:number[];

        if(protocolFunction == ProtocolFunction.BORROW_DEPOSIT){
            borrowingContract.on('Deposit',async (index,depositingAmount,tokensToLend,normalizedAmount) => {
                result = [index,depositingAmount,tokensToLend,normalizedAmount];
            })
        }else{
            cdsContract.on('Deposit',async (totalDepositingAmount,usdaAmount,usdtAmount,index,liquidationAmount,normalizedAmount,depositValue) => {
                result = [totalDepositingAmount,usdaAmount,usdtAmount,index,liquidationAmount,normalizedAmount,depositValue];
            })
        }

        return result;

    }
}
