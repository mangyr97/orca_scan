import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  private readonly wallets: Wallet[] = [];

  create(wallet: CreateCatDto): Wallet {
    this.wallets.push(wallet);
    return wallet;
  }

  findOne(id: number): Wallet {
    return this.wallets[id];
  }
}