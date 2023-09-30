import axios from 'axios';
import {Api, CurrecyData} from "../interfaces/api.ts";
export class Kraken implements Api {

    client = axios.create({
        baseURL: 'https://api.kraken.com/0',
    })
    async getCurrencyData(currency: string): Promise<CurrecyData> {
        const productId = this.formatProductId(currency)
        try {
            const response = await this.client.get(`/public/Ticker`, {
                params: {pair: productId}
            })
            return {
                OneDayPriceAverage: response.data.result[productId].p[1],
                OneDayVolumeAverage: response.data.result[productId].v[1]
            }
        } catch (error) {
            return {
                OneDayPriceAverage: -1,
                OneDayVolumeAverage: -1
            }
        }
    }

    private formatProductId (currency: string): string {
        return `${currency}/USD`
    }
}