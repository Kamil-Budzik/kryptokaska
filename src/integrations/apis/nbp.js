import { AxiosUtil } from "../axios/Axios.ts";
import { Urls } from "../axios/constants/Constants.ts";
export class NBPApi {
    constructor() {
        Object.defineProperty(this, "getNBPCurrencyExchangeRate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (table, currency) => {
                const finalUrl = Urls.NBP_BASE_URL + table + "/" + currency;
                try {
                    const response = await AxiosUtil.getCall(finalUrl);
                    return response?.data?.rates[0]?.mid;
                }
                catch (error) {
                    throw new Error('Error while fetching the conversion rates from NBP Api');
                }
            }
        });
    }
}
