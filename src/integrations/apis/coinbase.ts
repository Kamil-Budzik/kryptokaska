import {Api, CurrecyData} from "../interfaces/api.ts";
import {AxiosUtil} from "../axios/Axios.ts";
import {Constants} from "../axios/Constants.ts";

export class Coinbase implements Api {

    constructor(private readonly client: AxiosUtil) {
    }
    async getCurrencyData(currency: string): Promise<CurrecyData> {
        const productId = this.formatProductId(currency)
        const url = Constants.COINBASE_BASE_URL + `/products/${productId}/stats`
        try {
            const response = await this.client.getCall(url)
            return {
                OneDayPriceAverage: response.data.open,
                OneDayVolumeAverage: response.data.volume
            }
        } catch (error) {
            return {}
        }
    }

    private formatProductId (currency: string): string {
        return `${currency}-USD`
    }
}