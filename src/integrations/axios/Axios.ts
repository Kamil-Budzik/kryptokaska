import axios from 'axios';
import {Constants} from "./Constants.ts";

export class AxiosUtil {

    getNBPCurrencyExchangeRate = async (table: string, currency: string): Promise<number> => {
        const finalUrl = Constants.NBP_BASE_URL + table + "/" + currency
        const response = await this.getCall(finalUrl)
        return response?.data?.rates[0]?.mid
    }

    getCall = async (url: string, queryParams?: Record<string, string>, headers?: Record<string, string>) => {
        return await axios.get(url, {
            headers: headers,
            params: queryParams
        })
    }
}