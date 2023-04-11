import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [ConfigModule.forRoot(), WalletsModule],
})
export class AppModule {}
