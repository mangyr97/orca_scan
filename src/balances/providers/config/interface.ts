export type ICurrency = 'ETH' | 'BNB';
export type ITag = 'ETH' | 'BSC' | 'ARB' | 'OP';


export interface IToken {
    symbol:   string;
    name:     string;
    decimals: number;
    address:  string;
    logoURI:  string;
    tags:     string[];
}

export interface ITokens {
    tokens: { [key: string]: IToken };
}

export interface IChainlist {
    name: string;
    tag: ITag;
    chainId: number;
    currency: ICurrency;
    rpcs: string[];
    tokens?: ITokens;
};