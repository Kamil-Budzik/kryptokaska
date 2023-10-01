import { NBPApi } from "../integrations/apis/nbp";
export class CurrencyConversionUtil {
    constructor() {
        Object.defineProperty(this, "tablesMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                USD: 'A',
            }
        });
        Object.defineProperty(this, "nbpApi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.nbpApi = new NBPApi();
    }
    async convertToPln(currency, amount) {
        const table = this.tablesMap[currency];
        if (table == undefined) {
            throw new Error('Currency not supported');
        }
        const rate = await this.nbpApi.getNBPCurrencyExchangeRate(table, currency);
        return rate * amount;
    }
}
