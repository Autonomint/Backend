import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { Repository,Equal } from 'typeorm';
import { AddCdsDto } from './dto/create-cds.dto';
import { CdsPositionStatus } from './cds-status.enum';
import { WithdrawCdsDto } from './dto/withdraw-cds.dto';
import { GetCdsDeposit } from './dto/get-cds-deposit.dto';
import { ethers,utils,BigNumber } from 'ethers';
import { GetCdsDepositByChainId } from './dto/get-cds-deposit-by-chainid.dto';

@Injectable()
export class CdsService {
    constructor(
        @InjectRepository(CdsInfo)
        private cdsRepository: Repository<CdsInfo>,
        @InjectRepository(CdsDepositorInfo)
        private cdsDepositorRepository: Repository<CdsDepositorInfo>
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
            optedForLiquidation
        } = addCdsDto;

        const currentIndex = await this.getCdsDepositorIndexByAddress(address,chainId);
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
                liquidationAmount,
                optedForLiquidation,
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
                // cdsDepositor.totalLiquidationAmount = parseInt(liquidationAmount);
            }else{
                if(chainId == 11155111){
                    if(cdsDepositor.totalIndexInEthereum > 0){
                        cdsDepositor.totalDepositedAmintInEthereum = parseFloat(cdsDepositor.totalDepositedAmintInEthereum.toString()) + parseFloat(depositedAmint);
                    }else{
                        cdsDepositor.totalDepositedAmintInEthereum = parseFloat(depositedAmint);
                    }
                    cdsDepositor.totalIndexInEthereum = index;
                }else if(chainId == 80001){
                    if(cdsDepositor.totalIndexInEthereum > 0){
                        cdsDepositor.totalDepositedAmintInPolygon = parseFloat(cdsDepositor.totalDepositedAmintInPolygon.toString()) + parseFloat(depositedAmint);
                    }else{
                        cdsDepositor.totalDepositedAmintInPolygon = parseFloat(depositedAmint);
                    }
                    cdsDepositor.totalIndexInEthereum = index;
                }
                cdsDepositor.deposits.push(cds);
                // cdsDepositor.totalLiquidationAmount += parseInt(liquidationAmount);
            }
            cdsDepositor.address = address;

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

        await this.cdsRepository.save(found);
        await this.cdsDepositorRepository.save(cdsDepositor);

        return found;
    }
}
