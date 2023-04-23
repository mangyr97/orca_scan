import axios, {AxiosInstance} from 'axios';
import BigNumber from "bignumber.js";
import keccak256 from 'keccak256';
import {
    Multicall,
    ContractCallResults,
    ContractCallContext,
} from 'ethereum-multicall';
import ERC20Abi from './abi/erc20-abi.json';
import ERC20AbiBalanceOf from './abi/erc20-abi-balanceOf.json';
import { IChainlist } from './config/interface';
import { EvmOptions, IFullBalances, ITokens } from './interface';


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
    async getTokensBalancesByAddress(address: string): Promise<IFullBalances> {
        const contracts = Object.keys(this.tokens.tokens);
        const nativeBalance = await this.getBalanceByAddress(address)
        let contractCallContext: ContractCallContext[] = []
        console.log(contracts.length, this.metadata.tag);
        for (const contract of contracts) {
            contractCallContext.push(this.buildContractBalanceCallContext(contract, address, contract))
        }
        const balances = {};
        const response: ContractCallResults = await this.multicall.call(contractCallContext);
        balances[this.metadata.tag] = {};
        balances[this.metadata.tag].metadata = {
            name: this.metadata.name,
            tag: this.metadata.tag,
            chainId: this.metadata.chainId,
            currency: this.metadata.currency,
            balance: this.fromNativeNumber(nativeBalance).toString()
        };
        balances[this.metadata.tag].tokens = [];
        for (const contract of contracts) {
            const returnValue = response.results[contract].callsReturnContext[0].returnValues[0]
            if (returnValue) {
                const balance = returnValue.hex
                if (balance!=='0x00') {
                    balances[this.metadata.tag].tokens.push({
                        balance:  balance,
                        symbol:   this.tokens.tokens[contract].symbol,
                        name:     this.tokens.tokens[contract].name,
                        decimals: this.tokens.tokens[contract].decimals,
                        address:  this.tokens.tokens[contract].address,
                    })
                }
            }
        }
        return balances
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
    private buildContractBalanceCallContext(
        reference: string,
        ethereumAddress: string,
        contractAddress: string
    ): ContractCallContext {
        return {
            reference,
            contractAddress,
            abi: ERC20AbiBalanceOf,
            calls: [
                {
                    reference: 'balance',
                    methodName: 'balanceOf',
                    methodParameters: [ethereumAddress],
                }
            ],
        };
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

