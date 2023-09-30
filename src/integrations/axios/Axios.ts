import axios from 'axios';
import {BinanceResponse} from "./responses/BinanceResponse.ts";
import {Urls} from "./constants/Urls.ts";

export class AxiosClient {

    getBinanceCurrencyData = async (currencyCode: string): Promise<BinanceResponse> => {
        const queryParams = new Map()
        queryParams.set("symbol", currencyCode)
        const response
            = await this.getCall(Urls.BINANCE_BASE_URL, null, queryParams)
        if (response && response.data) {
            const { weightedAvgPrice, volume } = response.data;
            return { weightedAvgPrice, volume } as BinanceResponse;
        } else {
            return {} as BinanceResponse
        }
    }

    getNBPCurrencyExchangeRate = async (table: string, currency: string): Promise<number> => {
        const finalUrl = Urls.NBP_BASE_URL + table + "/" + currency
        const response = await this.getCall(finalUrl, null, null)
        return response?.data?.rates[0]?.mid
    }

    private getCall = async (url: string, headers: Map<string, string> | null, queryParams: Map<string, string> | null) => {
        const headersObject = headers ? Object.fromEntries(headers) : {};
        const queryParamsObject = queryParams ? Object.fromEntries(queryParams) : {};

        return await axios.get(url, {
            headers: headersObject,
            params: queryParamsObject
        })
            .catch((error) => {
                console.log(error);
            });
    }
}