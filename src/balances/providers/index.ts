import { IFullBalances } from "./interface";
import { EvmProvider } from "./provider";
import { EvmProviderFactory } from "./provider.factory";

export async function getProviders(): Promise<EvmProvider[]> {
    const factory = new EvmProviderFactory()
    const providers = await factory.create()
    return providers
}
export async function getAllBalances(providers: EvmProvider[], address: string): Promise<IFullBalances> {
    const balances = {}
    for (const provider of providers) {
        const tokens: IFullBalances = await provider.getTokensBalancesByAddress(address)
        balances[provider.metadata.tag] = tokens[provider.metadata.tag]
    }
    return balances
}