import {AxiosUtil} from "../integrations/axios/Axios.ts";
import {NBPApi} from "../integrations/apis/nbp.ts";

export class CurrencyConversionUtil {

    private tablesMap: Record<string, string> = {
        USD: 'A',
    }


    private nbpApi: NBPApi

    constructor(axiosClient: AxiosUtil) {
        this.nbpApi = new NBPApi(axiosClient)
    }

    async convertToPln(currency: string, amount: number): Promise<number> {
        const table = this.tablesMap[currency]
        if( table == undefined ){
            throw new Error('Currency not supported')
        }
        const rate
            = await this.nbpApi.getNBPCurrencyExchangeRate(table , currency)
        return rate * amount
    }
}