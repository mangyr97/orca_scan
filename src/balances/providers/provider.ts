import axios, {AxiosInstance} from 'axios';
import BigNumber from "bignumber.js";
import keccak256 from 'keccak256';
import {
    Multicall,
    ContractCallResults,
    ContractCallContext,
} from 'ethereum-multicall';
import ERC20Abi from './abi/erc20-abi.json';

export interface EthereumOptions {
    blockchainName: string;
    url: string;
}
export class EthereumProvider {
    protected readonly nodeUrl: string;
    protected readonly decimals: number;
    private api: AxiosInstance;
    private multicall: Multicall;
    constructor(options:EthereumOptions) {
        this.api = axios.create({
            baseURL: this.nodeUrl,
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        this.decimals = 18; // ethereum decimals
        this.nodeUrl = options.url;
        this.multicall = new Multicall({ nodeUrl: this.nodeUrl, tryAggregate: true });
    }
    async init() {
        const tokens = await this.getTokensBalancesByAddress('0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503', ['0xdAC17F958D2ee523a2206206994597C13D831ec7','0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'])
        console.log(tokens);
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
    async getTokensBalancesByAddress(address: string, contracts: string[]) {
        let contractCallContext: ContractCallContext[] = []
        for (const contract of contracts) {
            contractCallContext.push(this.buildContractCallContext('USDT', address, contract))
        }
        console.log();
        
        const results: ContractCallResults = await this.multicall.call(contractCallContext);
        console.log(JSON.stringify(results));
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

