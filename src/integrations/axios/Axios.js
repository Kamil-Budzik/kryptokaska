var _a;
import axios from 'axios';
export class AxiosUtil {
}
_a = AxiosUtil;
Object.defineProperty(AxiosUtil, "getCall", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: async (url, queryParams, headers) => {
        return await axios.get(url, {
            headers: headers,
            params: queryParams
        });
    }
});
