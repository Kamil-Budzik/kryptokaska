import { Binance } from "../apis/binance.ts";
import { Coinbase } from "../apis/coinbase.ts";
import { Kraken } from "../apis/kraken.ts";
export class ApiFacade {
    async callApi(apiName, currency) {
        let api;
        switch (apiName) {
            case "Binance":
                api = new Binance();
                return await api.getCurrencyData(currency);
            case "CoinBase":
                api = new Coinbase();
                return await api.getCurrencyData(currency);
            case "Kraken":
                api = new Kraken();
                return await api.getCurrencyData(currency);
        }
    }
}
