import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WalletsModule } from './wallets/wallets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletsEntity } from "./wallets/entities/wallet.entity";
@Module({
  imports: [
    ConfigModule.forRoot(),
    WalletsModule,
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
    // TypeOrmModule.forFeature([WalletsEntity]),

  ],
})
export class AppModule {}
