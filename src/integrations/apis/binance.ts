import axios from 'axios';
import {Api, CurrecyData} from "../interfaces/api.ts";
export class Binance implements Api {

    client = axios.create({
        baseURL: 'https://api.binance.com',
    })
    async getCurrencyData(currency: string): Promise<CurrecyData> {
        const productId = this.formatCurrencyId(currency)
        try {
            const response = await this.client.get(`/api/v3/ticker/24hr`, {
                params: {symbol: productId}
            })
            return {
                OneDayPriceAverage: response.data.weightedAvgPrice,
                OneDayVolumeAverage: response.data.volume
            }
        } catch (error) {
            return {
                OneDayPriceAverage: -1,
                OneDayVolumeAverage: -1
            }
        }
    }

    private formatCurrencyId (currency: string): string {
        return `${currency}-USDT`
    }
}