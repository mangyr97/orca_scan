import { chainList } from "../config";
import { EvmOptions } from "../interface";
import { EvmProvider } from "../provider";

describe('Ethereum provider test', () => {
    const options: EvmOptions = {
        metadata: chainList[0]
    };
    const contract = '0x0D8775F648430679A709E98d2b0Cb6250d2887EF';
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    const provider = new EvmProvider(options);
    test('getBalanceByAddress()', async () => {
        const balance = await provider.getBalanceByAddress(address);
        expect(balance.gt(0)).toBe(true);
    });
    test('getTokenBalanceByAddress()', async () => {
        const balance = await provider.getTokenBalanceByAddress(address, contract);
        expect(balance.gt(0)).toBe(true);
    });
    test('getTokensBalancesByAddress()', async () => {
        const balance = await provider.getTokensBalancesByAddress('0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503');
        console.log(balance);
    });
    test('getTokenDecimals()', async () => {
        const balance = await provider.getTokenBalanceByAddress(address, contract);
        const decimals = await provider.getTokenDecimals(contract);
        const humanBalance = provider.fromNativeNumber(balance,decimals);
        expect(humanBalance.gt(0)).toBe(true);
    });
});