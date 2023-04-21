import { Injectable } from '@nestjs/common';
import { EthereumProvider, EthereumOptions } from "./provider";

const options: EthereumOptions = {
  url:process.env.ETH_RPC
};

@Injectable()
export class BalancesService {
  private ethereumProvider: EthereumProvider
  constructor() {
    this.ethereumProvider = new EthereumProvider(options)
  }
  async onModuleInit(){
    console.log('init balances');
    
    await this.ethereumProvider.init()
  }
  async getBalances(address: string): Promise<string> {
    const balance = await this.ethereumProvider.getBalanceByAddress(address)
    return this.ethereumProvider.fromNativeNumber(balance).toString()
  }
}