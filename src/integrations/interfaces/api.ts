export interface Api {
    getCurrencyData (currency: string): Promise<CurrencyData | undefined>
}
export interface CurrencyData {
    OneDayPriceAverage: number
    OneDayVolumeAverage: number
    Currency: string
}