import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EthereumProvider } from './provider';

@Injectable()
export class EthereumProviderFactory {
  constructor(private provider: EthereumProvider, private configService: ConfigService) {}
  async create(): Promise<EthereumProvider> {
    const blockchainName = this.configService.get('blockchains');
    const url = this.configService.get('ETH_RPC');
    return new EthereumProvider({blockchainName,url})
  }
}
