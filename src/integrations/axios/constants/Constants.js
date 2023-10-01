export class Urls {
}
Object.defineProperty(Urls, "BINANCE_BASE_URL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'https://api.binance.com'
});
Object.defineProperty(Urls, "COINBASE_BASE_URL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'https://api.exchange.coinbase.com'
});
Object.defineProperty(Urls, "NBP_BASE_URL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'https://api.nbp.pl/api/exchangerates/rates/'
});
Object.defineProperty(Urls, "KRAKEN_BASE_URL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'https://api.kraken.com/0'
});
Object.defineProperty(Urls, "COINGECKO_BASE_URL", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 'https://api.coingecko.com/api/v3/coins'
});
export const APIS = [
    { name: 'Binance', url: Urls.BINANCE_BASE_URL },
    { name: 'CoinBase', url: Urls.COINBASE_BASE_URL },
    { name: 'Kraken', url: Urls.KRAKEN_BASE_URL }
];
export const CRYPTO_CURRENCIES = [
    { name: 'Bitcoin', shortcut: 'BTC', uiName: '', hdApiName: 'bitcoin' },
    { name: 'Ethereum', shortcut: 'ETH', uiName: '', hdApiName: 'ethereum' },
    { name: 'Manchester City Fan Token', shortcut: 'CITY', uiName: '', hdApiName: 'manchester city fan token' }
];
