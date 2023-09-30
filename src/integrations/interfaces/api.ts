export interface Api {
    getCurrencyData (currency: string): Promise<CurrencyData>
}
export interface CurrencyData {
    oneDayPriceAverage?: number
    oneDayVolume?: number
}

export interface historicalData {
    currency: string
    records: record[]
}

export interface record {
    price: number
    date: Date
}