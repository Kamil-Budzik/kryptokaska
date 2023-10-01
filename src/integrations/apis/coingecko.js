import { AxiosUtil } from "../axios/Axios.ts";
import { Urls } from "../axios/constants/Constants.ts";
export class CoinGecko {
    async getHistoricalData(currency, weeks) {
        const url = Urls.COINGECKO_BASE_URL + '/' + currency + '/history';
        const dates = this.getDates(weeks);
        const promises = dates.map(async (date) => {
            try {
                const response = await AxiosUtil.getCall(url, {
                    localization: 'false',
                    date: date
                });
                return response.data.market_data.current_price.usd;
            }
            catch (error) {
                console.error(`Failed to fetch for date ${date}: ${error}`);
                return {};
            }
        });
        const prices = await Promise.all(promises);
        return { dates, prices };
    }
    getDates(weeks) {
        const dates = [];
        for (let i = 0; i < weeks * 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(this.getCurrentDate(date));
        }
        return dates;
    }
    getCurrentDate(date = new Date()) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        return dd + '-' + mm + '-' + yyyy;
    }
}
