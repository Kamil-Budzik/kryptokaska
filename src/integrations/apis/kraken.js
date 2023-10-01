import { AxiosUtil } from "../axios/Axios.ts";
import { Urls } from "../axios/constants/Constants.ts";
export class Kraken {
    async getCurrencyData(currency) {
        const productId = this.formatProductId(currency);
        const url = Urls.KRAKEN_BASE_URL + `/public/Ticker`;
        try {
            const response = await AxiosUtil.getCall(url, {
                pair: productId
            });
            return {
                OneDayPriceAverage: response.data.result[productId].p[1],
                OneDayVolumeAverage: response.data.result[productId].v[1],
                Currency: currency
            };
        }
        catch (error) {
            console.error('Error while getting currency data from Kraken');
            return undefined;
        }
    }
    formatProductId(currency) {
        return `${currency}/USD`;
    }
}
