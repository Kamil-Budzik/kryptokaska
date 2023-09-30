import axios from 'axios';

export class Test {
    binance = async () => {
        console.log("v 1")
        await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT', {
            headers:
                {
                    "Accept": "*/*"
                }
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
