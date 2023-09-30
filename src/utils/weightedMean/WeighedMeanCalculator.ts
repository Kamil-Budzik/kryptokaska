import {ExchangeData} from "./ExchangeData.ts";

export class WeighedMeanCalculator {

    /*
    Why I made this as a separate method?
    We might want to inform the user about removed outliers - in that
    case this should be a separate step.
     */
    removeVolumeOutliers(dataList: ExchangeData[],
                                numberOfStandardDeviations: number = 1): ExchangeData[] {

        const standardDeviation = this.calculateStandardDeviation(dataList);
        const mean = this.calculateMean(dataList);
        const lowerThreshold = mean - (numberOfStandardDeviations * standardDeviation);
        return dataList.filter(data => data.getVolume24h() > lowerThreshold);
    }

    /*
    Use this method on a list of ExchangeData that was
    filtered by removeVolumeOutliers method.
     */
    weightedPriceMean(dataList: ExchangeData[]): number {
        const sumOfWeightedValues =
            dataList.reduce((sum, data) =>
                sum + data.getVolume24h() * data.getAverageValue24h(), 0);
        const sumOfVolumes =
            dataList.reduce((sum, data) =>
                sum + data.getVolume24h(), 0);
        return sumOfWeightedValues / sumOfVolumes;
    }

    private calculateMean(dataList: ExchangeData[]): number {
        const total = dataList.reduce((sum, data) =>
            sum + data.getVolume24h(), 0);
        return total / dataList.length;
    }

    private calculateStandardDeviation(dataList: ExchangeData[]): number {
        const mean = this.calculateMean(dataList);
        const squaredDifferences = dataList.map(data => {
            const difference = data.getVolume24h() - mean;
            return difference * difference;
        });

        const averageSquaredDifference =
            squaredDifferences.reduce((sum, val) => sum + val, 0) / dataList.length;
        return Math.sqrt(averageSquaredDifference);
    }

    //method that generates sample data to test solution
    getSampleData(): ExchangeData[] {
        return [
            new ExchangeData('Bitcoin', 48, 117930.50),
            new ExchangeData('Bitcoin', 40, 120000.23),
            new ExchangeData('Bitcoin', 7, 115000),
            new ExchangeData('Bitcoin', 20, 106000),
            new ExchangeData('Bitcoin', 22, 115000),
            new ExchangeData('Bitcoin', 2, 20),
            new ExchangeData('Bitcoin', 1, 5000),
        ];
    }
}

