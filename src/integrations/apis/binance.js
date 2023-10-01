import { AxiosUtil } from "../axios/Axios.ts";
import { Urls } from "../axios/constants/Constants.ts";
export class Binance {
    async getCurrencyData(currency) {
        const productId = this.formatCurrencyId(currency);
        const url = Urls.BINANCE_BASE_URL + `/api/v3/avgPrice`;
        try {
            const response = await AxiosUtil.getCall(url, {
                symbol: productId
            });
            return {
                OneDayPriceAverage: response.data.weightedAvgPrice,
                OneDayVolumeAverage: response.data.volume,
                Currency: currency
            };
        }
        catch (error) {
            console.error('Error while getting currency data from Binance');
            return undefined;
        }
    }
    formatCurrencyId(currency) {
        return `${currency}-USDT`;
    }
}
