import { Injectable } from '@nestjs/common';
import { EthereumProvider, EthereumOptions } from "./providers/provider";
import { ConfigService } from '@nestjs/config';

const options: EthereumOptions = {
  blockchainName: 'ETH',
  url:process.env.ETH_RPC
};

@Injectable()
export class BalancesService {
  private ethereumProvider: EthereumProvider
  private configService: ConfigService = new ConfigService()
  constructor() {
    this.ethereumProvider = new EthereumProvider(options)
  }
  async onModuleInit(){
    console.log(this.configService.get<String>('ETH_RPC'));
    await this.ethereumProvider.init()
  }
  async getBalances(address: string): Promise<string> {
    const balance = await this.ethereumProvider.getBalanceByAddress(address)
    return this.ethereumProvider.fromNativeNumber(balance).toString()
  }
}