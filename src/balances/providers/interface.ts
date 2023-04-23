import { IChainlist, ICurrency, ITag } from "./config/interface";

export interface EvmOptions{
    metadata: IChainlist
}

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

export interface IFullBalances {
    [key: string]: IBalances
}

export interface IBalances {
    metadata: Metadata;    
    tokens:   ITokensBalances[];
}

export interface Metadata {
    name: string;
    tag: ITag;
    chainId: number;
    currency: ICurrency;
    balance:  string;
}

export interface ITokensBalances {
    balance:  string;
    symbol:   string;
    name:     string;
    decimals: number;
    address:  string;
}