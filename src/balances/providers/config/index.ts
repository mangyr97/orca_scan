import { ConfigService } from "@nestjs/config";
import { IChainlist } from "./interface";

const configService = new ConfigService();

export const chainList: IChainlist[] = [
    {
        name: "Ethereum Mainnet",
        tag: "ETH",
        chainId: 1,
        currency: "ETH",
        rpcs: configService.get<string>('ETH_RPC').split(','),
    },
    {
        name: "Binance Smart Chain Mainnet",
        tag: "BSC",
        chainId: 56,
        currency: "BNB",
        rpcs: configService.get<string>('BSC_RPC').split(','),
    }
];