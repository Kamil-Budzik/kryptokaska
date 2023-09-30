import {Api, CurrencyData} from "../interfaces/api.ts";
import {AxiosUtil} from "../axios/Axios.ts";
import {Urls} from "../axios/constants/Urls.ts";

export class Kraken implements Api {

    constructor(private readonly client: AxiosUtil) {
    }
    async getCurrencyData(currency: string): Promise<CurrencyData> {
        const productId = this.formatProductId(currency)
        const url = Urls.KRAKEN_BASE_URL + `/public/Ticker`
        try {
            const response = await this.client.getCall(url, {
                pair: productId
            })
            return {
                oneDayPriceAverage: response.data.result[productId].p[1],
                oneDayVolume: response.data.result[productId].v[1]
            }
        } catch (error) {
            return {}
        }
    }

    private formatProductId (currency: string): string {
        return `${currency}/USD`
    }
}