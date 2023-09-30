import {AxiosUtil} from "../axios/Axios.ts";
import {Urls} from "../axios/constants/Urls.ts";

export class NBPApi {

    constructor(private readonly client: AxiosUtil){
    }

    getNBPCurrencyExchangeRate = async (table: string, currency: string): Promise<number> => {
        const finalUrl = Urls.NBP_BASE_URL + table + "/" + currency
        try {
            const response = await this.client.getCall(finalUrl)
            return response?.data?.rates[0]?.mid
        } catch (error) {
            throw new Error('Error while fetching the conversion rates from NBP Api')
        }
    }
}