import { EvmProvider } from "./provider";
import { EvmProviderFactory } from "./provider.factory";

export async function getProviders(): Promise<EvmProvider[]> {
    const factory = new EvmProviderFactory()
    const providers = await factory.create()
    return providers
}
export async function getAllBalances(providers: EvmProvider[], address: string) {
    const balances = {}
    for (const provider of providers) {
        balances[provider.metadata.tag] = (await provider.getBalanceByAddress(address)).toString()
    }
    return balances
}