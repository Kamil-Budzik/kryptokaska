import {CurrencyData} from "../../integrations/interfaces/api.ts";

export class WeighedMeanCalculator {

    /*
    Why I made this as a separate method?
    We might want to inform the user about removed outliers - in that
    case this should be a separate step.
     */
    removeVolumeOutliers(dataList: CurrencyData[],
                                numberOfStandardDeviations: number = 1): CurrencyData[] {

        const standardDeviation = this.calculateStandardDeviation(dataList);
        const mean = this.calculateMean(dataList);
        const lowerThreshold = mean - (numberOfStandardDeviations * standardDeviation);
        return dataList.filter(data => data.OneDayVolumeAverage > lowerThreshold);
    }

    /*
    Use this method on a list of ExchangeData that was
    filtered by removeVolumeOutliers method.
     */
    weightedPriceMean(dataList: CurrencyData[]): number {
        const sumOfWeightedValues =
            dataList.reduce((sum, data) =>
                sum + data.OneDayVolumeAverage * data.OneDayPriceAverage, 0);
        const sumOfVolumes =
            dataList.reduce((sum, data) =>
                sum + data.OneDayVolumeAverage, 0);
        return sumOfWeightedValues / sumOfVolumes;
    }

    private calculateMean(dataList: CurrencyData[]): number {
        const total = dataList.reduce((sum, data) =>
            sum + data.OneDayVolumeAverage, 0);
        return total / dataList.length;
    }

    private calculateStandardDeviation(dataList: CurrencyData[]): number {
        const mean = this.calculateMean(dataList);
        const squaredDifferences = dataList.map(data => {
            const difference = data.OneDayVolumeAverage - mean;
            return difference * difference;
        });

        const averageSquaredDifference =
            squaredDifferences.reduce((sum, val) => sum + val, 0) / dataList.length;
        return Math.sqrt(averageSquaredDifference);
    }
}

