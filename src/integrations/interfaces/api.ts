export interface Api {
    getCurrencyData (currency: string): Promise<CurrencyData>
}
export interface CurrencyData {
    oneDayPriceAverage?: number
    oneDayVolume?: number
}

export interface HistoricalData {
    dates: string[]
    prices: number[]
}
