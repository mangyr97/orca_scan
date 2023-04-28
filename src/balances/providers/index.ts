import { IFullBalances } from "./interface";
import { EvmProvider } from "./provider";
import { EvmProviderFactory } from "./provider.factory";
import PromiseB from 'bluebird';
import {TaskQueue} from 'cwait';

export async function getProviders(): Promise<EvmProvider[]> {
    const factory = new EvmProviderFactory()
    const providers = await factory.create()
    return providers
}
export async function getAllBalancesParallel(providers: EvmProvider[], address: string): Promise<IFullBalances> {
    const queue = new TaskQueue(PromiseB, 6);
    const addressMap = Array.from(Array(providers.length),(e,i)=>address);
    const balances = {}
    const results = await Promise.all(
        [...addressMap.map(queue.wrap((address,index)=> providers[index].getTokensBalancesByAddress(address)))]
    )
    for (const result of results) {
        const tag = Object.keys(result)[0]
        balances[tag]=result[tag]
    }
    return balances
}
export async function getAllBalances(providers: EvmProvider[], address: string): Promise<IFullBalances> {
    const balances = {}
    for (const provider of providers) {
        const tokens: IFullBalances = await provider.getTokensBalancesByAddress(address)
        balances[provider.metadata.tag] = tokens[provider.metadata.tag]
    }
    return balances
}