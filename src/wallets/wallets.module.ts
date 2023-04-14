import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { WalletsEntity } from "./entities/wallet.entity";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [WalletsController],
  providers: [WalletsService],
  imports: [
    TypeOrmModule.forFeature([WalletsEntity]),
  ]
})
export class WalletsModule {}