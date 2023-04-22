import { ConfigService } from "@nestjs/config";
import { EthereumProviderFactory } from "./provider.factory";

export function getProviders(configService: ConfigService) {
    const providers = new EthereumProviderFactory(configService)
    return providers
}