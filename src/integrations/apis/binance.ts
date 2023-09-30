import {Api, CurrecyData} from "../interfaces/api.ts";
import {AxiosUtil} from "../axios/Axios.ts";
import {Constants} from "../axios/Constants.ts";

export class Binance implements Api {

    constructor(private readonly client: AxiosUtil) {
    }
    async getCurrencyData(currency: string): Promise<CurrecyData> {
        const productId = this.formatCurrencyId(currency)
        const url = Constants.BINANCE_BASE_URL + `/api/v3/avgPrice`
        try {
            const response = await this.client.getCall( url,{
                symbol: productId
            })
            return {
                OneDayPriceAverage: response.data.weightedAvgPrice,
                OneDayVolumeAverage: response.data.volume
            }
        } catch (error) {
            return {}
        }
    }

    private formatCurrencyId (currency: string): string {
        return `${currency}-USDT`
    }
}