import { IsString, MinLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IFullBalances } from '../providers/interface';

export class GetBalanceRequestDto {
  @ApiProperty({ example: '0x3428C6B411C6e3147DAD28cdAc63CB736444eA97', description: 'The user wallet address' })
  @IsString()
  readonly address: string;
}
const example = {
  ETH: {
    metadata: {
      name: "Ethereum Mainnet",
      tag: "ETH",
      chainId: 1,
      currency: "ETH",
      balance: "0.163812188391329885"
    },
    tokens: [
      {
        balance: "0x013f9c",
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7"
      }
    ]
  }
}
export class GetBalanceResponsetDto {
  @ApiProperty({ example, description: 'The address balance' })
  readonly balances: IFullBalances;
}
