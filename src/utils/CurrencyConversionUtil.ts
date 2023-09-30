import {AxiosClient} from "../integrations/axios/Axios.ts";

export class CurrencyConversionUtil {

    private tablesMap = new Map<string, string>([
        ["USD", "A"]
    ])

    private axiosClient

    constructor(axiosClient: AxiosClient) {
        this.axiosClient = axiosClient
    }

    async convertToPln(currency: string, amount: number): Promise<number> {
        const rate
            = await this.axiosClient.getNBPCurrencyExchangeRate(this.tablesMap.get(currency) ?? 'A', currency)
        return rate * amount
    }
}