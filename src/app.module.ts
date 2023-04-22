import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';
import { BalancesModule } from "./balances/balances.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletsEntity } from "./wallets/entities/wallet.entity";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WalletsModule,
    BalancesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [WalletsEntity],
      synchronize: true,
      logging: ["error"],
    }),
  ],
})
export class AppModule {}
