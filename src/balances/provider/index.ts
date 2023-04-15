import axios, {AxiosInstance} from 'axios';
import BigNumber from "bignumber.js";
import keccak256 from 'keccak256';

export interface EthereumOptions {
    url: string;
}
export class EthereumProvider {
    protected readonly nodeUrl: string;
    protected readonly decimals: number;
    private api: AxiosInstance;
    constructor(options:EthereumOptions) {
        this.nodeUrl = options.url;
        this.decimals = 18; // ethereum decimals
        this.api = axios.create({
            baseURL: this.nodeUrl,
            headers: {
                'Content-Type': 'application/json' 
            }
        });
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
        
    }
    prepareCall(address: string, method: string) {
        const preMethod = `0x${keccak256(method).toString('hex')}`.slice(0,10);
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
        const call = `0x${keccak256(method).toString('hex')}`
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
}

