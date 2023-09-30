import {Api, CurrecyData} from "../interfaces/api.ts";
import {AxiosUtil} from "../axios/Axios.ts";
import {Urls} from "../axios/constants/Urls.ts";

export class Binance implements Api {

    constructor(private readonly client: AxiosUtil) {
    }
    async getCurrencyData(currency: string): Promise<CurrecyData> {
        const productId = this.formatCurrencyId(currency)
        const url = Urls.BINANCE_BASE_URL + `/api/v3/avgPrice`
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