import { Injectable } from '@nestjs/common';
import { EvmProvider } from './provider';
import { chainList } from './config';

@Injectable()
export class EvmProviderFactory {
  constructor() {}
  async create(): Promise<EvmProvider[]> {
    const providers = []
    for (const chain of chainList) {
      const provider = new EvmProvider({metadata: chain})
      await provider.init()
      providers.push(provider)
    }
    return providers
  }
}
