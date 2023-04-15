import { EthereumProvider, EthereumOptions } from "../index";

describe('Ethereum provider test', () => {
    const options: EthereumOptions = {
        url:process.env.ETH_RPC
    };
    const contract = '0x0D8775F648430679A709E98d2b0Cb6250d2887EF';
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    const provider = new EthereumProvider(options);
    test('getBalanceByAddress()', async () => {
        const balance = await provider.getBalanceByAddress(address);
        expect(balance.gt(0)).toBe(true);
    });
    test('getTokenBalanceByAddress()', async () => {
        const balance = await provider.getTokenBalanceByAddress(address, contract);
        expect(balance.gt(0)).toBe(true);
    });
    test('getTokenDecimals()', async () => {
        const balance = await provider.getTokenBalanceByAddress(address, contract);
        const decimals = await provider.getTokenDecimals(contract);
        const humanBalance = provider.fromNativeNumber(balance,decimals);
        expect(humanBalance.gt(0)).toBe(true);
    });
});