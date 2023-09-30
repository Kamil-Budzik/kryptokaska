import {Api, CurrecyData} from "../interfaces/api.ts";
import {AxiosUtil} from "../axios/Axios.ts";
import {Constants} from "../axios/Constants.ts";
export class Kraken implements Api {

    constructor(private readonly client: AxiosUtil) {
    }
    async getCurrencyData(currency: string): Promise<CurrecyData> {
        const productId = this.formatProductId(currency)
        const url = Constants.KRAKEN_BASE_URL + `/public/Ticker`
        try {
            const response = await this.client.getCall(url, {
                pair: productId
            })
            return {
                OneDayPriceAverage: response.data.result[productId].p[1],
                OneDayVolumeAverage: response.data.result[productId].v[1]
            }
        } catch (error) {
            return {}
        }
    }

    private formatProductId (currency: string): string {
        return `${currency}/USD`
    }
}