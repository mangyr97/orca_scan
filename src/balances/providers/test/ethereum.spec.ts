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
    test('getTokensBalancesByAddress()', async () => {
        const balance = await provider.getTokensBalancesByAddress('0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503', ['0xdAC17F958D2ee523a2206206994597C13D831ec7','0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48']);
        // console.log(balance);
    });
    test('getTokenDecimals()', async () => {
        const balance = await provider.getTokenBalanceByAddress(address, contract);
        const decimals = await provider.getTokenDecimals(contract);
        const humanBalance = provider.fromNativeNumber(balance,decimals);
        expect(humanBalance.gt(0)).toBe(true);
    });
});