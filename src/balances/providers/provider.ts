import axios, {AxiosInstance} from 'axios';
import BigNumber from "bignumber.js";
import keccak256 from 'keccak256';
import {
    Multicall,
    ContractCallResults,
    ContractCallContext,
} from 'ethereum-multicall';
import ERC20Abi from './abi/erc20-abi.json';
import { IChainlist } from './config/interface';

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

export class EvmProvider {
    protected readonly nodeUrl: string;
    protected readonly decimals: number;
    readonly metadata: IChainlist;
    private tokens: ITokens;
    private api: AxiosInstance;
    private multicall: Multicall;
    constructor(options:EvmOptions) {
        this.nodeUrl = options.metadata.rpcs[0];
        this.metadata = options.metadata
        this.api = axios.create({
            baseURL: this.nodeUrl,
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        this.decimals = 18; // ethereum decimals
        this.multicall = new Multicall({ nodeUrl: this.nodeUrl, tryAggregate: true });
    }
    async init() {
        const res = await axios.get<ITokens>(`https://api.1inch.io/v4.0/${this.metadata.chainId}/tokens`);
        this.tokens = res.data
        console.log(this.tokens.tokens);
    }
    async getBalanceByAddress(address: string): Promise<BigNumber> {
        const body = {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [address, "latest"],
            id: this.getRequestId()
        };
        const response = await this.postRequest(body);
        if (response) {
            return this.fromHex(response.result)
        }
    }
    async getTokenBalanceByAddress(address: string, contract : string): Promise<BigNumber> {
        const call = this.prepareCall(address,'balanceOf(address)')
        const body = {
            jsonrpc: "2.0",
            method: "eth_call",
            params: [{"data":call,"to":contract}, "latest"],
            id: this.getRequestId()
        };
        const response = await this.postRequest(body);
        return this.fromHex(response.result)
    }
    async getTokensBalancesByAddress(address: string) {
        // let contractCallContext: ContractCallContext[] = []
        // for (const contract of this.tokens) {
        //     contractCallContext.push(this.buildContractCallContext('USDT', address, contract))
        // }
        // console.log();
        
        // const results: ContractCallResults = await this.multicall.call(contractCallContext);
        // console.log(JSON.stringify(results));
    }
    prepareCall(address: string, method: string) {
        const preMethod = this.keccak(method).slice(0,10);
        const preAddress = address.startsWith('0x')? address.slice(2): address
        const zeros = '000000000000000000000000'
        return preMethod+zeros+preAddress
    }
    fromHex(n: string): BigNumber {
        return new BigNumber(n,16)
    }
    fromNativeNumber(n: string | number | BigNumber, decimals?: number): BigNumber {
        return new BigNumber(n).shiftedBy(decimals? -decimals:-this.getDecimals())
    }
    toNativeNumber(n: string | number | BigNumber, decimals?: number): BigNumber {
        return new BigNumber(n).shiftedBy(decimals? decimals:this.getDecimals())
    }
    getDecimals(): number {
        return this.decimals
    }
    async getTokenDecimals(contract: string): Promise<number> {
        const method = 'decimals()'
        const call = this.keccak(method)
        const body = {
            jsonrpc: "2.0",
            method: "eth_call",
            params: [{"data":call,"to":contract}, "latest"],
            id: this.getRequestId()
        };
        const response = await this.postRequest(body);
        return this.fromHex(response.result).toNumber()
    }
    async postRequest(body) {
        try {
            const response = await this.api.post(
                this.nodeUrl,
                body
            )
            return response.data
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    }
    private getRequestId() {
        return new Date().getTime()
    }
    private keccak (text: string) {
        return `0x${keccak256(text).toString('hex')}`
    }

    private buildContractCallContext(
        reference: string,
        ethereumAddress: string,
        contractAddress: string
      ): ContractCallContext {
        return {
          reference,
          contractAddress,
          abi: ERC20Abi,
          calls: [
            {
              reference: 'balance',
              methodName: 'balanceOf',
              methodParameters: [ethereumAddress],
            },
            {
              reference: 'symbol',
              methodName: 'symbol',
              methodParameters: [],
            },
            {
              reference: 'decimals',
              methodName: 'decimals',
              methodParameters: [],
            },
            {
              reference: 'name',
              methodName: 'name',
              methodParameters: [],
            },
          ],
        };
      }
}

