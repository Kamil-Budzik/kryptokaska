import { Binance } from "../integrations/apis/binance.ts";
import { Coinbase } from "../integrations/apis/coinbase.ts";
import { Kraken } from "../integrations/apis/kraken.ts";
import { WeighedMeanCalculator } from "../utils/weightedMean/WeighedMeanCalculator.ts";
import { CurrencyConversionUtil } from '../utils/CurrencyConversionUtil.ts';
export class PriceCalculator {
    constructor() {
        Object.defineProperty(this, "binanceApi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Binance()
        });
        Object.defineProperty(this, "coinbaseApi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Coinbase()
        });
        Object.defineProperty(this, "krakenApi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Kraken()
        });
        Object.defineProperty(this, "weighedMeanCalculator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new WeighedMeanCalculator()
        });
        Object.defineProperty(this, "currencyConverter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new CurrencyConversionUtil()
        });
    }
    async getCalculationData(currency) {
        const binanceData = await this.binanceApi.getCurrencyData(currency);
        const coinbaseData = await this.coinbaseApi.getCurrencyData(currency);
        const krakenData = await this.krakenApi.getCurrencyData(currency);
        return [binanceData, coinbaseData, krakenData];
    }
    async calculateAveragePrice(datasets) {
        const datasetsWithoutOutliers = this.weighedMeanCalculator.removeVolumeOutliers(datasets);
        const priceMeanUSD = this.weighedMeanCalculator.weightedPriceMean(datasetsWithoutOutliers);
        return this.currencyConverter.convertToPln('USD', priceMeanUSD);
    }
}
