export type ICurrency = 'ETH' | 'BNB';
export type ITag = 'ETH' | 'BSC' | 'ARB' | 'OP';



export interface IChainlist {
    name: string;
    tag: ITag;
    chainId: number;
    currency: ICurrency;
    rpcs: string[];
};