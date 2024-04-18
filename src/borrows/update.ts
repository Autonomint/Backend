
// funtion for getting priceHistory 
async getAmintPriceHistory(chainId:number,days:number,allTime:AllTime):Promise<number[]>{
    let amintPrice:number[];
    if(allTime == AllTime.YES){
        days = (await this.globalRepository.findOne({where:{chainId:chainId}})).day;
    }
    for(let i = 1;i<=days;i++){
        const found = await this.chartRepository.findOne({where:{
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

// for getting priceHistory
getAmintPriceHistory(@Param() params:{chainId:number;days:number;allTime:AllTime}):Promise<number[]>{
    const chainId = params.chainId;
    const days = params.days;
    const allTime = params.allTime;
    return this.borrowsService.getAmintPriceHistory(chainId,days,allTime);
}


// Updated createChart function to include amintPrice
async createChart(){
    for (let i = 0;i < this.chainIds.length;i++){
        const found = await this.globalRepository.findOne({where:{
            chainId:this.chainIds[i],
            treasuryEthBalance:Not(0),
            treasuryAmintBalance:Not(0)
        }});
        if(found){
            const signer = await this.getSignerOrProvider(this.chainIds[i],true);
            let borrowingContract;
            let poolContract;
            if(this.chainIds[i] == 11155111){
                borrowingContract = new ethers.Contract(borrowAddressSepolia,borrowABISepolia,signer);
                poolContract = new ethers.Contract(poolAddressSepolia,poolABISepolia,signer);
            }else if(this.chainIds[i] == 5){
                borrowingContract = new ethers.Contract(borrowAddressGoerli,borrowABIGoerli,signer);
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

// Updated getAmintPrice function to include slot0
getAmintPrice(data:BigInt):number {
    const Decimal0 = 6;
    const Decimal1 = 18;
    const sqrtPriceX96 = Number(data);
    const buyOneOfToken0 = ((sqrtPriceX96 / 2**96)**2) / (Number((10**Decimal1 / 10**Decimal0).toFixed(Decimal1)));
    const buyOneOfToken1 = Number((1 / Number(buyOneOfToken0))).toFixed(Decimal0);
    return Number(buyOneOfToken0) * Number(buyOneOfToken1);
}


