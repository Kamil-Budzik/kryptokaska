export class WeighedMeanCalculator {
    /*
    Why I made this as a separate method?
    We might want to inform the user about removed outliers - in that
    case this should be a separate step.
     */
    removeVolumeOutliers(dataList, numberOfStandardDeviations = 1) {
        const standardDeviation = this.calculateStandardDeviation(dataList);
        const mean = this.calculateMean(dataList);
        const lowerThreshold = mean - (numberOfStandardDeviations * standardDeviation);
        return dataList.filter(data => data.OneDayVolumeAverage > lowerThreshold);
    }
    /*
    Use this method on a list of ExchangeData that was
    filtered by removeVolumeOutliers method.
     */
    weightedPriceMean(dataList) {
        const sumOfWeightedValues = dataList.reduce((sum, data) => sum + data.OneDayVolumeAverage * data.OneDayPriceAverage, 0);
        const sumOfVolumes = dataList.reduce((sum, data) => sum + data.OneDayVolumeAverage, 0);
        return sumOfWeightedValues / sumOfVolumes;
    }
    calculateMean(dataList) {
        const total = dataList.reduce((sum, data) => sum + data.OneDayVolumeAverage, 0);
        return total / dataList.length;
    }
    calculateStandardDeviation(dataList) {
        const mean = this.calculateMean(dataList);
        const squaredDifferences = dataList.map(data => {
            const difference = data.OneDayVolumeAverage - mean;
            return difference * difference;
        });
        const averageSquaredDifference = squaredDifferences.reduce((sum, val) => sum + val, 0) / dataList.length;
        return Math.sqrt(averageSquaredDifference);
    }
}
