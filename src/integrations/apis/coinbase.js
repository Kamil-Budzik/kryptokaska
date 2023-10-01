import { AxiosUtil } from "../axios/Axios.ts";
import { Urls } from "../axios/constants/Constants.ts";
export class Coinbase {
    async getCurrencyData(currency) {
        const productId = this.formatProductId(currency);
        const url = Urls.COINBASE_BASE_URL + `/products/${productId}/ticker`;
        try {
            const response = await AxiosUtil.getCall(url);
            return {
                OneDayPriceAverage: response.data.price,
                OneDayVolumeAverage: response.data.volume,
                Currency: currency
            };
        }
        catch (error) {
            console.error('Error while getting currency data from Coinbase');
            return undefined;
        }
    }
    formatProductId(currency) {
        return `${currency}-USD`;
    }
}
