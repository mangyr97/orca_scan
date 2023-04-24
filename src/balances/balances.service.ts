import { Injectable } from '@nestjs/common';
import { EvmProvider } from "./providers/provider";
import { getAllBalancesParallel, getProviders } from './providers';



@Injectable()
export class BalancesService {
  private evmProviders: EvmProvider[]
  constructor() {
  }
  async onModuleInit(){
    this.evmProviders = await getProviders()
  }
  async getBalances(address: string): Promise<any> {
    const balances = await getAllBalancesParallel(this.evmProviders, address)
    return balances
  }
}