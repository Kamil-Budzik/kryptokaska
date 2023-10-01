export class Urls
{
    static readonly BINANCE_BASE_URL= 'https://api.binance.com';
    static readonly COINBASE_BASE_URL= 'https://api.exchange.coinbase.com';
    static readonly NBP_BASE_URL= 'https://api.nbp.pl/api/exchangerates/rates/';
    static readonly KRAKEN_BASE_URL = 'https://api.kraken.com/0';
    static readonly COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3/coins';
}

export const APIS = [
    { name: 'Binance', url: Urls.BINANCE_BASE_URL },
    { name: 'CoinBase', url: Urls.COINBASE_BASE_URL },
    { name: 'Kraken', url: Urls.KRAKEN_BASE_URL }
]

export const CRYPTO_CURRENCIES = [
    { name: 'Bitcoin', shortcut: 'BTC', uiName: 'Bitcoin (BTC)', hdApiName: 'bitcoin' },
    { name: 'Ethereum', shortcut: 'ETH', uiName: 'Ethereum (ETH)', hdApiName: 'ethereum' },
    { name: 'Manchester City Fan Token', shortcut: 'CITY', uiName: 'Manchester City Fan Token (CITY)', hdApiName: 'manchester city fan token' }
]