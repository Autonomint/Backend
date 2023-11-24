import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { Repository } from 'typeorm';
import { AddCdsDto } from './dto/create-cds.dto';
import { CdsPositionStatus } from './cds-status.enum';
import { WithdrawCdsDto } from './dto/withdraw-cds.dto';
import { GetCdsDeposit } from './dto/get-cds-deposit.dto';

@Injectable()
export class CdsService {
    constructor(
        @InjectRepository(CdsInfo)
        private cdsRepository: Repository<CdsInfo>,
        @InjectRepository(CdsDepositorInfo)
        private cdsDepositorRepository: Repository<CdsDepositorInfo>
    ){}

    async getCdsDeposit(getCdsDeposit:GetCdsDeposit):Promise<CdsInfo>{
        const{address,index} = getCdsDeposit;
        const found = await this.cdsRepository.findOne(
            {where:{
                address:address,
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

    async getCdsDepositorIndexByAddress(address:string):Promise<number>{
        const found = await this.cdsDepositorRepository.findOne({where:{address}});
        if(!found){
            return 0;
        }else{
            return found.totalIndex;
        }
    }

    async addCds(addCdsDto:AddCdsDto):Promise<CdsInfo>{
        const{
            address,
            index,
            depositedAmint,
            depositedTime,
            ethPriceAtDeposit,
            apr,
            lockingPeriod,
            liquidationAmount,
            optedForLiquidation
        } = addCdsDto;

        const currentIndex = await this.getCdsDepositorIndexByAddress(address);
        if(currentIndex == (index-1) || currentIndex == 0){
            const cds = this.cdsRepository.create({
                address,
                index,
                depositedAmint,
                depositedTime,
                ethPriceAtDeposit,
                apr,
                lockingPeriod,
                liquidationAmount,
                optedForLiquidation,
                status:CdsPositionStatus.DEPOSITED
            });

            let cdsDepositor = await this.cdsDepositorRepository.findOne({where:{address}});

            if(!cdsDepositor){
                cdsDepositor = new CdsDepositorInfo();
                cdsDepositor.totalDepositedAmint = parseInt(depositedAmint);
                cdsDepositor.deposits = [cds]
                // cdsDepositor.totalLiquidationAmount = parseInt(liquidationAmount);
            }else{
                cdsDepositor.totalDepositedAmint += parseInt(depositedAmint);
                cdsDepositor.deposits.push(cds);
                // cdsDepositor.totalLiquidationAmount += parseInt(liquidationAmount);
            }
            cdsDepositor.address = address;
            cdsDepositor.totalIndex = index;

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
                index:index
            }});
        const cdsDepositor = await this.cdsDepositorRepository.findOne({where:{address:address}});

        found.withdrawTime = (withdrawTime);
        found.ethPriceAtWithdraw = ethPriceAtWithdraw;
        found.withdrawAmount = withdrawAmount;
        found.withdrawEthAmount = withdrawEthAmount;
        found.fees = fees;
        cdsDepositor.totalDepositedAmint -= parseInt(found.depositedAmint);
        cdsDepositor.totalFees += parseInt(fees);
        cdsDepositor.totalFeesWithdrawn += parseInt(feesWithdrawn);
        found.status = CdsPositionStatus.WITHDREW;

        await this.cdsRepository.save(found);
        await this.cdsDepositorRepository.save(cdsDepositor);

        return found;
    }
}
