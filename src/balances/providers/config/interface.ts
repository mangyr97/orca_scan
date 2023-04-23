export type ICurrency = 'ETH' | 'BNB' | 'MATIC';
export type ITag = 'ETH' | 'BSC' | 'ARB' | 'OP' | 'ERA' | 'MATIC';

export interface IChainlist {
    name: string;
    tag: ITag;
    chainId: number;
    currency: ICurrency;
    rpcs: string[];
};