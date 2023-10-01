import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Wrapper from "../components/UI/Wrapper";
import { Divider, Typography } from "@mui/material";
import CryptoApiCard from "../components/ApiSummary/CryptoApiCard.tsx";
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
    return (_jsxs(Wrapper, { children: [_jsx("header", { children: _jsx(Typography, { component: "h1", variant: "h5", children: "Wyniki z Gie\u0142d Kryptowalut" }) }), _jsx(Divider, {}), cryptoApiList.map((cryptoApiItem, index) => (_jsx(CryptoApiCard, { ...cryptoApiItem }, index)))] }));
}
export default ApiSummary;
