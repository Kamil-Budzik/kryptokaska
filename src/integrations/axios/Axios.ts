import axios from 'axios';

export class AxiosUtil {

    static getCall = async (url: string, queryParams?: Record<string, string>, headers?: Record<string, string>) => {
        return await axios.get(url, {
            headers: headers,
            params: queryParams
        })
    }
}