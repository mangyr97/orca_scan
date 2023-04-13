import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletsEntity } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(WalletsEntity)
    private readonly walletsRepository: Repository<WalletsEntity>,
  ) {}
  
  async create(createWallet: CreateWalletDto): Promise<WalletsEntity> {
    return this.walletsRepository.create()
  }
  findAll(): Promise<WalletsEntity[]> {
    return this.walletsRepository.find();
  }

  async findById(id: number): Promise<WalletsEntity> {
    return await this.walletsRepository.findOneBy({id});
  }

  async remove(id: string): Promise<void> {
    await this.walletsRepository.delete(id);
  }
}