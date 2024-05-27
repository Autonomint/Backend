import { OnModuleInit } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Contract,ethers } from 'ethers';
import { Server } from 'socket.io';
import {
    borrowAddressSepolia,borrowAddressBaseSepolia,
    cdsAddressSepolia,cdsAddressBaseSepolia,
    treasuryAddressSepolia,treasuryAddressBaseSepolia,
    optionsAddressSepolia,optionsAddressBaseSepolia,
    poolAddressSepolia,usdaAddressModeSepolia,
    borrowABI,cdsABI,treasuryABI,optionsABI,poolABI,usdaABI,
    eidSepolia,eidBaseSepolia

} from '../utils/index';

@WebSocketGateway()
export class MyGateway implements OnModuleInit{

    constructor(){

            let borrowingContractSepolia: Contract;
            let cdsContractSepolia: Contract;
            let borrowingContractBaseSepolia: Contract;
            let cdsContractBaseSepolia: Contract;
            let usdaContractMode:Contract
    
            const providerSepolia = this.getProvider(11155111);
            borrowingContractSepolia = new ethers.Contract(borrowAddressSepolia,borrowABI,providerSepolia);
            cdsContractSepolia = new ethers.Contract(cdsAddressSepolia,cdsABI,providerSepolia);;
    
            const providerBaseSepolia = this.getProvider(84532);
            borrowingContractBaseSepolia = new ethers.Contract(borrowAddressBaseSepolia,borrowABI,providerBaseSepolia);
            cdsContractBaseSepolia = new ethers.Contract(cdsAddressBaseSepolia,cdsABI,providerBaseSepolia);
    
            const providerMode = this.getProvider(919);
            usdaContractMode = new ethers.Contract(usdaAddressModeSepolia,usdaABI,providerMode);
    
            let result:number[];
    
            borrowingContractSepolia.on('Deposit',async (index,depositingAmount,tokensToLend,normalizedAmount) => {
                result = [index,depositingAmount,tokensToLend,normalizedAmount];
                console.log(result);
                // this.onMessage(result);    
            })
            cdsContractSepolia.on('Deposit',async (totalDepositingAmount,usdaAmount,usdtAmount,index,liquidationAmount,normalizedAmount,depositValue) => {
                result = [totalDepositingAmount,usdaAmount,usdtAmount,index,liquidationAmount,normalizedAmount,depositValue];
                // this.onMessage(result);
            })
            borrowingContractBaseSepolia.on('Deposit',async (index,depositingAmount,tokensToLend,normalizedAmount) => {
                result = [index,depositingAmount,tokensToLend,normalizedAmount];
                // this.onMessage(result);
            })
            cdsContractBaseSepolia.on('Deposit',async (totalDepositingAmount,usdaAmount,usdtAmount,index,liquidationAmount,normalizedAmount,depositValue) => {
                result = [totalDepositingAmount,usdaAmount,usdtAmount,index,liquidationAmount,normalizedAmount,depositValue];
                // this.onMessage(result);
            })
            usdaContractMode.on('OFTReceived',async(guid,srcEid,toAddress,amountReceivedLD) => {
                result = [guid,srcEid,toAddress,amountReceivedLD];
                // this.onMessage(result);
            })
    }

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

    @WebSocketServer()
    server:Server

    onModuleInit() {
        this.server.on('connection',(socket) =>{
            console.log(socket.id);
            console.log('Connected')
        })
    }

    // @SubscribeMessage('newMessage')
    // onMessage(@MessageBody() body:any){
    //     console.log(body);
    //     this.server.emit('onMessage',{
    //         msg: 'New Message',
    //         content: body
    //     })
    // }
}