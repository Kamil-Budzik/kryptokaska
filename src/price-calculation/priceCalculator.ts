import {AxiosUtil} from "../integrations/axios/Axios.ts";
import {Binance} from "../integrations/apis/binance.ts";
import {Coinbase} from "../integrations/apis/coinbase.ts";
import {Kraken} from "../integrations/apis/kraken.ts";
import {CurrencyData} from "../integrations/interfaces/api.ts";
import {WeighedMeanCalculator} from "../utils/weightedMean/WeighedMeanCalculator.ts";

export class PriceCalculator {

    axiosClient = new AxiosUtil()
    binanceApi = new Binance(this.axiosClient)
    coinbaseApi = new Coinbase(this.axiosClient)
    krakenApi = new Kraken(this.axiosClient)
    weighedMeanCalculator = new WeighedMeanCalculator()

    async getCalculationData(currency: string): Promise<(CurrencyData | undefined)[]> {
        const binanceData = await this.binanceApi.getCurrencyData(currency)
        const coinbaseData = await this.coinbaseApi.getCurrencyData(currency)
        const krakenData = await this.krakenApi.getCurrencyData(currency)
        return [binanceData, coinbaseData, krakenData]
    }

    async calculateAveragePrice(datasets: CurrencyData[]): Promise<number> {
        const datasetsWithoutOutliers = this.weighedMeanCalculator.removeVolumeOutliers(datasets)
        return this.weighedMeanCalculator.weightedPriceMean(datasetsWithoutOutliers)
    }

}