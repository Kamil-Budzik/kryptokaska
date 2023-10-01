import {Binance} from "../integrations/apis/binance.ts";
import {Coinbase} from "../integrations/apis/coinbase.ts";
import {Kraken} from "../integrations/apis/kraken.ts";
import {CurrencyData} from "../integrations/interfaces/api.ts";
import {WeighedMeanCalculator} from "../utils/weightedMean/WeighedMeanCalculator.ts";
import { CurrencyConversionUtil } from '../utils/CurrencyConversionUtil.ts';

export class PriceCalculator {

    binanceApi = new Binance()
    coinbaseApi = new Coinbase()
    krakenApi = new Kraken()
    weighedMeanCalculator = new WeighedMeanCalculator()
    currencyConverter = new CurrencyConversionUtil()

    async getCalculationData(currency: string): Promise<(CurrencyData | undefined)[]> {
        const binanceData = await this.binanceApi.getCurrencyData(currency)
        const coinbaseData = await this.coinbaseApi.getCurrencyData(currency)
        const krakenData = await this.krakenApi.getCurrencyData(currency)
        return [binanceData, coinbaseData, krakenData]
    }

    async calculateAveragePrice(datasets: CurrencyData[]): Promise<number> {
        const datasetsWithoutOutliers = this.weighedMeanCalculator.removeVolumeOutliers(datasets)
        const priceMeanUSD = this.weighedMeanCalculator.weightedPriceMean(datasetsWithoutOutliers)
        return this.currencyConverter.convertToPln('USD', priceMeanUSD)
    }

}