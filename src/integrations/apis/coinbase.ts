import axios from 'axios';
class Coinbase implements Api {

    client = axios.create({
        baseURL: 'https://api.exchange.coinbase.com',
    })
    async get24hrPriceAverage(currency: string): Promise<number> {
        const productId = this.formatProductId(currency)
        const response = await this.client.get(`/products/${productId}/stats`)
        return response.data.last
    }
    async get24hrVolumeAverage (currency: string): Promise<number> {
        const productId = this.formatProductId(currency)
        const response = await this.client.get(`/products/${productId}/stats`)
        return response.data.volume
    }

    private formatProductId (currency: string): string {
        return `${currency}-USD`
    }
}