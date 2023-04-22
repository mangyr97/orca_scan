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
    }
];