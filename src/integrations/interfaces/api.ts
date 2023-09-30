interface Api {
    get24hrPriceAverage (currency: string): Promise<number>
    get24hrVolumeAverage (currency: string): Promise<number>
}