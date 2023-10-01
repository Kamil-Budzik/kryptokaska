import Wrapper from "../components/UI/Wrapper";
import {Divider, Typography} from "@mui/material";
import CryptoApiCard from "../components/ApiSummary/CryptoApiCard.tsx";
import CheckCryptoTechnicalAnalysis from "../components/ApiSummary/CheckCryptoTechnicalAnalysis.tsx";


function ApiSummary() {
    const cryptoApiList = [
        {
            crypto: {
                id: "1",
                fullName: "Bitcoin",
                shortName: "BTC"
            },
            amount: 0.063,
            dateAndTime: "2023-10-02 14:00:00",
            exchangeData: [
                {
                    isFromApi: true,
                    name: "Binance",
                    address: "https://www.binance.com",
                    rateInPLN: "200000",
                    rateInUSD: "50000"
                },
                {
                    isFromApi: true,
                    name: "Coinbase",
                    address: "https://www.coinbase.com",
                    rateInPLN: "198000",
                    rateInUSD: "49900"
                }
            ]
        },
        {
            crypto: {
                id: "2",
                fullName: "Ethereum",
                shortName: "ETH"
            },
            amount: 5,
            dateAndTime: "2023-10-02 15:10:00",
            exchangeData: [
                {
                    isFromApi: true,
                    name: "Binance",
                    address: "https://www.binance.com",
                    rateInPLN: "10000",
                    rateInUSD: "2500"
                }
            ]
        }
    ];
    return (
        <Wrapper>
            <header>
                <Typography component="h1" variant="h5">
                    Wyniki z Giełd Kryptowalut
                </Typography>
            </header>
            {
                cryptoApiList.map(value => value.crypto.shortName)
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .map((value, index) => (
                        <CheckCryptoTechnicalAnalysis key={index}  cryptoSymbol={value} />
                    ))
            }
            <Divider/>
            {
                cryptoApiList.map(
                    (cryptoApiItem, index) => (
                        <CryptoApiCard key={index} {...cryptoApiItem}/>
                    ))
            }
        </Wrapper>
    )
}

export default ApiSummary;