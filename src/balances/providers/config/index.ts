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
        name: "Optimism Mainnet",
        tag: "OP",
        chainId: 10,
        currency: "ETH",
        rpcs: configService.get<string>('OP_RPC').split(','),
    },
    {
        name: "Polygon Mainnet",
        tag: "MATIC",
        chainId: 137,
        currency: "MATIC",
        rpcs: configService.get<string>('MATIC_RPC').split(','),
    },
    {
        name: "Binance Smart Chain Mainnet",
        tag: "BSC",
        chainId: 56,
        currency: "BNB",
        rpcs: configService.get<string>('BSC_RPC').split(','),
    },
    {
        name: "zkSync Era Mainnet",
        tag: "ERA",
        chainId: 324,
        currency: "ETH",
        rpcs: configService.get<string>('ERA_RPC').split(','),
        multicallContractAddress: configService.get<string>('ERA_MULTICALL')
    },
    {
        name: "Arbitrum One",
        tag: "ARB",
        chainId: 42161,
        currency: "ETH",
        rpcs: configService.get<string>('ARB_RPC').split(','),
    },
];