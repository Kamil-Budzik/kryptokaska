import {Binance} from "../apis/binance.ts";
import {Coinbase} from "../apis/coinbase.ts";
import {Kraken} from "../apis/kraken.ts";

export interface Api {
    getCurrencyData (currency: string): Promise<CurrencyData | undefined>
}
export interface CurrencyData {
    OneDayPriceAverage: number
    OneDayVolumeAverage: number
    Currency: string
    source?: string
}

export interface HistoricalData {
    dates: string[]
    prices: number[]
}


export class ApiFacade {

    async  callApi(apiName: string, currency: string): Promise<CurrencyData | undefined> {
        let api
        switch (apiName) {
            case "Binance":
                api = new Binance()
                return await api.getCurrencyData(currency)
            case "CoinBase":
                api = new Coinbase()
                return await api.getCurrencyData(currency)
            case "Kraken":
                api = new Kraken()
                return await api.getCurrencyData(currency)
        }
    }
}

export interface HistoricalData {
    dates: string[]
    prices: number[]
}