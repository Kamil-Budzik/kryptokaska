import axios from 'axios';

export class test {
     binance = async () => {
         await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BTC')
             .then((response) => {
                 console.log(response.data);
             })
             .catch((error) => {
                 console.log(error);
             });
     }
}
