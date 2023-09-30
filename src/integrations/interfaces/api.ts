export interface Api {
    getCurrencyData (currency: string): Promise<CurrecyData>
}
export interface CurrecyData {
    OneDayPriceAverage: number
    OneDayVolumeAverage: number
}