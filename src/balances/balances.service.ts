import { Injectable } from '@nestjs/common';
import { EvmProvider } from "./providers/provider";
import { ConfigService } from '@nestjs/config';
import { getAllBalances, getProviders } from './providers';



@Injectable()
export class BalancesService {
  private evmProviders: EvmProvider[]
  private configService: ConfigService = new ConfigService()
  constructor() {
  }
  async onModuleInit(){
    console.log(this.configService.get<String>('ETH_RPC'));
    this.evmProviders = await getProviders()
  }
  async getBalances(address: string): Promise<any> {
    const balances = await getAllBalances(this.evmProviders, address)
    return balances
  }
}