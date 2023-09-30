import axios from 'axios';
import {Api, CurrecyData} from "../interfaces/api.ts";

export class Coinbase implements Api {

    client = axios.create({
        baseURL: 'https://api.exchange.coinbase.com',
    })
    async getCurrencyData(currency: string): Promise<CurrecyData> {
        const productId = this.formatProductId(currency)
        try {
            const response = await this.client.get(`/products/${productId}/stats`)
            return {
                OneDayPriceAverage: response.data.open,
                OneDayVolumeAverage: response.data.volume
            }
        } catch (error) {
            return {
                OneDayPriceAverage: -1,
                OneDayVolumeAverage: -1
            }
        }
    }

    private formatProductId (currency: string): string {
        return `${currency}-USD`
    }
}