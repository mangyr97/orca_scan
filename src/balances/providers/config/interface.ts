export type ICurrency = 'ETH' | 'BNB' | 'MATIC' | 'AVAX';
export type ITag = 'ETH' | 'BSC' | 'ARB' | 'OP' | 'ERA' | 'MATIC' | 'AVAX';

export interface IChainlist {
    name: string;
    tag: ITag;
    chainId: number;
    currency: ICurrency;
    rpcs: string[];
    multicallContractAddress?: string;
};