import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CdsInfo } from './entities/cds.entity';
import { CdsDepositorInfo } from './entities/cdsDepositor.entity';
import { Repository } from 'typeorm';
import { AddCdsDto } from './dto/create-cds.dto';
import { CdsPositionStatus } from './cds-status.enum';
import { WithdrawCdsDto } from './dto/withdraw-cds.dto';

@Injectable()
export class CdsService {
    constructor(
        @InjectRepository(CdsInfo)
        private cdsRepository: Repository<CdsInfo>,
        @InjectRepository(CdsDepositorInfo)
        private cdsDepositorRepository: Repository<CdsDepositorInfo>
    ){}

    async getCdsDepositsById(id:string):Promise<CdsInfo>{
        const found = await this.cdsRepository.findOne({where:{id:id}});
        if(!found){
            throw new NotFoundException(`Deposit with ID "${id}" not found`);
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
            depositedAmount,
            depositedTime,
            ethPriceAtDeposit,
            liquidationAmount,
            optedForLiquidation
        } = addCdsDto;

        const currentIndex = await this.getCdsDepositorIndexByAddress(address);
        if(currentIndex == (index-1) || currentIndex == 0){
            const cds = this.cdsRepository.create({
                address,
                index,
                depositedAmount,
                depositedTime,
                ethPriceAtDeposit,
                liquidationAmount,
                optedForLiquidation,
                status:CdsPositionStatus.DEPOSITED
            });

            let cdsDepositor = await this.cdsDepositorRepository.findOne({where:{address}});

            if(!cdsDepositor){
                cdsDepositor = new CdsDepositorInfo();
                cdsDepositor.totalDepositedAmount = parseInt(depositedAmount);
                // cdsDepositor.totalLiquidationAmount = parseInt(liquidationAmount);
            }else{
                cdsDepositor.totalDepositedAmount += parseInt(depositedAmount);
                // cdsDepositor.totalLiquidationAmount += parseInt(liquidationAmount);
            }
            cdsDepositor.address = address;
            cdsDepositor.totalIndex = index;
            cdsDepositor.deposits = [cds];

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
            withdrawEthAmount
        } = cdsWithdrawDto;

        const found = await this.cdsRepository.findOne(
            {where:{
                address:address,
                index:index
            }});
        const cdsDepositor = await this.cdsDepositorRepository.findOne({where:{address:address}});

        found.withdrawTime = withdrawTime;
        found.ethPriceAtWithdraw = ethPriceAtWithdraw;
        found.withdrawAmount = withdrawAmount;
        found.withdrawEthAmount = withdrawEthAmount;
        cdsDepositor.totalDepositedAmount -= parseInt(found.depositedAmount);
        found.status = CdsPositionStatus.WITHDREW;

        await this.cdsRepository.save(found);
        await this.cdsDepositorRepository.save(cdsDepositor);

        return found;
    }
}
