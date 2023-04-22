import { Injectable } from '@nestjs/common';
import { EvmProvider } from './provider';
import { chainList } from './config';
import { ITokens } from './config/interface';

import axios from 'axios';

@Injectable()
export class EvmProviderFactory {
  constructor() {}
  async create(): Promise<EvmProvider[]> {
    const providers = []
    for (const chain of chainList) {
      const res = await axios.get<ITokens>(`https://api.1inch.io/v4.0/${chain.chainId}/tokens`);
      chain.tokens = res.data
      providers.push(new EvmProvider({metadata: chain}))
    }
    return providers
  }
}
