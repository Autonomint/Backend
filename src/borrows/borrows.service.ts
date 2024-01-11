import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { PositionStatus } from './borrow-status.enum';
import { AddBorrowDto } from './dto/create-borrow.dto';
import { GetBorrowFilterDto } from './dto/get-borrow-filter.dto';
import { BorrowInfo } from './entities/borrow.entity';
import { Repository,Equal,Not,MoreThanOrEqual } from 'typeorm';
import { ethers,getDefaultProvider } from 'ethers';
import { BorrowerInfo } from './entities/borrower.entity';
import { WithdrawDto } from './dto/withdraw.dto';
import { GetBorrowDeposit } from './dto/get-borrow-deposit.dto';
import { CriticalPositions } from './entities/liquidation.entity';
import { bybit, pro } from 'ccxt';

import {
    borrowAddressSepolia,borrowABISepolia,
    cdsAddressSepolia,cdsABISepolia,
    treasuryAddressSepolia,treasuryABISepolia,
    optionsAddressSepolia,optionsABISepolia,
    borrowAddressMumbai,borrowABIMumbai,
    cdsAddressMumbai,cdsABIMumbai,
    treasuryAddressMumbai,treasuryABIMumbai,
    optionsAddressMumbai,optionsABIMumbai
} from '../utils/index';
import { GetBorrowDepositByChainId } from './dto/get-borrow-deposit-by-chainid.dto';
import { Cron,CronExpression } from '@nestjs/schedule';
import { GlobalService } from '../global/global.service';
import { LiquidationInfo } from './entities/liquidatedInfo.entity';
import { StrikePricePercent } from './borrow-strike-price.enum';
import { Batch } from './entities/batch.entity';
import { HighLTVPositions } from './entities/high-ltv-positions.entity';
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
        @Inject(GlobalService)
        private globalService:GlobalService,
    ){}
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
        if(currentIndex == (index-1) || currentIndex == 0){
            // Calculating liquidation eth price as 80% of current eth price
            const liquidationEthPrice = (ethPrice*80)/100;
            // Calculating critical eth price as 83% of current eth price
            const criticalEthPrice = (ethPrice*83)/100;
            const borrow = this.borrowRepository.create({
                address,
                index,
                chainId,
                collateralType,
                downsideProtectionPercentage,
                aprAtDeposit,
                depositedAmount,
                normalizedAmount,
                depositedTime,
                ethPrice,
                liquidationEthPrice,
                criticalEthPrice,
                noOfAmintMinted,
                strikePrice:strikePriceCalculated,
                optionFees,
                downsideProtectionStatus:true,
                totalFeesDeducted:(parseFloat(optionFees)/30).toString(),
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
                borrower.totalAmint = parseFloat(noOfAmintMinted);
                borrower.totalAbond = 0;
                borrower.totalIndex = index;
                borrower.borrows = [borrow];
            }else{
                borrower.totalDepositedAmount = parseFloat(borrower.totalDepositedAmount.toString()) + parseFloat(depositedAmount);
                borrower.totalAmint = parseFloat(borrower.totalAmint.toString()) +  parseFloat(noOfAmintMinted);
                borrower.totalAbond = 0;
                borrower.totalIndex = index;
                borrower.borrows.push(borrow);
            }
            borrower.address = address;

            const batch = await this.batchRepository.findOne({where:{
                chainId:chainId,
                batchNo:batchNo}});
            if(!batch){
                batch.deposits = [borrow]
            }else{
                batch.deposits.push(borrow);
            }

            // Getting eth balance in treasury
            const ethBalance = await this.globalService.getTreasuryEthBalance(chainId);

            // Updating eth balance in treasury
            if(ethBalance == 0){
                this.globalService.setTreasuryEthBalance(chainId,parseFloat(depositedAmount)); 
            }else{
                this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) + parseFloat(depositedAmount)); 
            }

            await this.borrowRepository.save(borrow);
            await this.borrowerRepository.save(borrower);
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
            borrowDebt,
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
        // const borrowDebtInEther = ethers.utils.formatEther(borrowDebt);
        // Formatting the values in wei to Ether
        const withdrawAmountInEther = ethers.utils.formatEther(withdrawAmount);
        const amountYetToWithdrawInEther = ethers.utils.formatEther(amountYetToWithdraw);
        const noOfAbondInEther = ethers.utils.formatEther(noOfAbond);

        if(!found.withdrawAmount1 && found.status != PositionStatus.LIQUIDATED){
            found.withdrawTime1 = withdrawTime;
            found.withdrawAmount1 = withdrawAmountInEther;
            found.noOfAbondMinted = parseFloat(noOfAbondInEther);
            found.amountYetToWithdraw = amountYetToWithdrawInEther;
            found.totalDebtAmount = totalDebtAmount;
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

        // Updating eth balance in treasury
        this.globalService.setTreasuryEthBalance(chainId,parseFloat(ethBalance.toString()) - parseFloat(withdrawAmountInEther));

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
    async getEthVolatility(chainId:number,amount:string,strikePricePercent:number):Promise<[number,number]>{
        const abc = await this.exchange.fetchVolatilityHistory('ETH',{period:30});
        const volatility = abc.map(item => item.info[0].value)[0];
        const signer = await this.getSignerOrProvider(chainId,true);
        const optionsContractSepolia = new ethers.Contract(optionsAddressSepolia,optionsABISepolia,signer);
        const optionsContractMumbai = new ethers.Contract(optionsAddressMumbai,optionsABIMumbai,signer);
        let optionFees;
        if(chainId == 80001){
            optionFees = await optionsContractMumbai.calculateOptionPrice(volatility,parseInt(amount),strikePricePercent);
        }else if(chainId == 11155111){
            optionFees = await optionsContractSepolia.calculateOptionPrice(volatility,parseInt(amount),strikePricePercent);
        }
        return[(volatility * 1e8),optionFees];
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

    @Cron(CronExpression.EVERY_5_MINUTES)
    async updateDownsideProtectionStatus(){
        const currentBatchnNoMumbai = await this.globalService.getBatchNo(80001);
        const currentBatchnNoSepolia = await this.globalService.getBatchNo(11155111);
        if(currentBatchnNoMumbai > 30){
            const updatingPositionsMumbai = await this.batchRepository.findOne({where:{
                chainId:80001,
                batchNo:Equal(currentBatchnNoMumbai - 30)
            }});

            updatingPositionsMumbai.deposits.map(updatingPosition =>{
                if(updatingPosition.status == PositionStatus.DEPOSITED){
                    updatingPosition.downsideProtectionStatus = false;
                    updatingPosition.liquidationEthPrice = (updatingPosition.ethPrice * 90)/100;            
                }
            })
            await this.batchRepository.save(updatingPositionsMumbai);
        }

        if(currentBatchnNoSepolia > 30){
            const updatingPositionsSepolia = await this.batchRepository.findOne({where:{
                chainId:11155111,
                batchNo:Equal(currentBatchnNoSepolia - 30)
            }});
    
            updatingPositionsSepolia.deposits.map(updatingPosition =>{
                if(updatingPosition.status == PositionStatus.DEPOSITED){
                    updatingPosition.downsideProtectionStatus = false;
                    updatingPosition.liquidationEthPrice = (updatingPosition.ethPrice * 90)/100;
                }
            })
            await this.batchRepository.save(updatingPositionsSepolia);
        }
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async liquidateOptionsExpiredUsers(){
        const currentBatchnNoMumbai = await this.globalService.getBatchNo(80001);
        const currentBatchnNoSepolia = await this.globalService.getBatchNo(11155111);

        const liquidationPositionsMumbaiFromBatch = await this.batchRepository.findOne({where:{
            chainId:80001,
            batchNo:Equal(currentBatchnNoMumbai - 30)
        }});

        const liquidationPositionsSepoliaFromBatch = await this.batchRepository.findOne({where:{
            chainId:11155111,
            batchNo:Equal(currentBatchnNoSepolia - 30)
        }});

        const positionsMumbaiFromHighLtv = await this.highLtvPositionsRepository.findBy({
            chainId:80001
        });
        const positionsSepoliaFromHighLtv = await this.highLtvPositionsRepository.findBy({
            chainId:11155111
        });

        let liquidationPositionsMumbaiFromHighLtv:BorrowInfo[];
        let liquidationPositionsSepoliaFromHighLtv:BorrowInfo[];

        for(let i=0;i<positionsMumbaiFromHighLtv.length;i++){
            if(!liquidationPositionsMumbaiFromHighLtv){
                liquidationPositionsMumbaiFromHighLtv = [await this.borrowRepository.findOne({where:
                    {id:Equal(positionsMumbaiFromHighLtv[i].positionId)}})]
            }else{
                liquidationPositionsMumbaiFromHighLtv.push(await this.borrowRepository.findOne({where:
                    {id:Equal(positionsMumbaiFromHighLtv[i].positionId)}
                }));
            }
        }

        for(let i=0;i<positionsSepoliaFromHighLtv.length;i++){
            if(!liquidationPositionsSepoliaFromHighLtv){
                liquidationPositionsSepoliaFromHighLtv = [await this.borrowRepository.findOne({where:
                    {id:Equal(positionsSepoliaFromHighLtv[i].positionId)}})]
            }else{
                liquidationPositionsSepoliaFromHighLtv.push(await this.borrowRepository.findOne({where:
                    {id:Equal(positionsSepoliaFromHighLtv[i].positionId)}
                }));
            }
        }

        let liquidationPositionsMumbai = liquidationPositionsMumbaiFromHighLtv.concat(liquidationPositionsMumbaiFromBatch.deposits)
        let liquidationPositionsSepolia = liquidationPositionsSepoliaFromHighLtv.concat(liquidationPositionsSepoliaFromBatch.deposits)

        const signerMumbai = await this.getSignerOrProvider(80001,true);
        const borrowingContractMumbai = new ethers.Contract(borrowAddressMumbai,borrowABIMumbai,signerMumbai);

        const signerSepolia = await this.getSignerOrProvider(11155111,true);
        const borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signerSepolia);

        const currentEthPrice = await borrowingContractMumbai.getUSDValue();
        const ltv = await borrowingContractMumbai.getLTV();
        const ethPrice = currentEthPrice.toNumber()/100;

        if(ltv <= 90){
            liquidationPositionsMumbai.map(async (liquidationPosition) =>{
                if(liquidationPosition.liquidationEthPrice == ethPrice && !liquidationPosition.downsideProtectionStatus){
                    await borrowingContractMumbai.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
                    liquidationPosition.status = PositionStatus.LIQUIDATED;
                }else{
                    return;
                }
            })
    
            liquidationPositionsSepolia.map(async (liquidationPosition) =>{
                if(liquidationPosition.liquidationEthPrice == ethPrice && !liquidationPosition.downsideProtectionStatus){
                    await borrowingContractSepolia.liquidate(liquidationPosition.address,liquidationPosition.index,currentEthPrice);
                    liquidationPosition.status = PositionStatus.LIQUIDATED;
                }else{
                    return;
                }
            })
        }else{
            // Getting all the entities in High LTV positions
            const existingEntities = await this.highLtvPositionsRepository.find();
            // Check whether the positions are already not stored 
            liquidationPositionsMumbai = liquidationPositionsMumbai.filter(positionMumbai => !existingEntities.some(existingEntity => existingEntity.positionId === positionMumbai.id));
            liquidationPositionsMumbai.map(async (position) =>{
                const highLtvPositionsMumbai = new HighLTVPositions();
                highLtvPositionsMumbai.batchNo = currentBatchnNoMumbai - 30;
                highLtvPositionsMumbai.chainId = 80001;
                highLtvPositionsMumbai.positionId = position.id;
                highLtvPositionsMumbai.address = position.address;
                highLtvPositionsMumbai.index = position.index;
                highLtvPositionsMumbai.status = position.status;
                await this.highLtvPositionsRepository.save(highLtvPositionsMumbai);
            })
            liquidationPositionsMumbai.map(async (position) =>{
                const highLtvPositionsSepolia = new HighLTVPositions();
                highLtvPositionsSepolia.batchNo = currentBatchnNoMumbai - 30;
                highLtvPositionsSepolia.chainId = 11155111;
                highLtvPositionsSepolia.positionId = position.id;
                highLtvPositionsSepolia.address = position.address;
                highLtvPositionsSepolia.index = position.index;
                highLtvPositionsSepolia.status = position.status;
                await this.highLtvPositionsRepository.save(highLtvPositionsSepolia);
            })
        }
        await this.batchRepository.save(liquidationPositionsMumbaiFromBatch);
        await this.batchRepository.save(liquidationPositionsSepoliaFromBatch);
    }
}
