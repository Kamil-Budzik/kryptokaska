import {AxiosUtil} from "../axios/Axios.ts";
import {Urls} from "../axios/constants/Urls.ts";

export class CoinGecko {

    constructor(private readonly client: AxiosUtil) {
    }

    async getHistoricalData(currency: string, weeks: number): Promise<any> {
        const url = Urls.COINGECKO_BASE_URL + '/' + currency + '/history'
        const dates = this.getDates(weeks)

        const promises = dates.map(async date => {
            try {
                return await this.client.getCall(url, {
                    localization: 'false',
                    date: date
                });
            } catch (error) {
                console.error(`Failed to fetch for date ${date}: ${error}`);
                return {};
            }
        });

        const results = await Promise.all(promises);
        console.log(results);
        return results;
    }

    private getDates(weeks: number): string[] {
        const dates: string[] = [];
        for (let i = 0; i < weeks * 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(this.getCurrentDate(date));
        }
        return dates;
    }

    private getCurrentDate(date: Date = new Date()): string {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        return dd + '-' + mm + '-' + yyyy;
    }
}