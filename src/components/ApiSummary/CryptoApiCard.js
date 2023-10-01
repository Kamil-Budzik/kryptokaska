import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Grid } from '@mui/material';
import CryptoApiCardHeader from "./CryptoApiCardHeader.tsx";
import TextField from "@mui/material/TextField";
function CryptoApiCard({ crypto, amount, dateAndTime, exchangeData }) {
    return (_jsx(Card, { variant: "outlined", children: _jsxs(CardContent, { children: [_jsx(CryptoApiCardHeader, { crypto: crypto, amount: amount, dateAndTime: dateAndTime }), _jsx("br", {}), _jsx("hr", {}), _jsx("br", {}), _jsx(Grid, { container: true, justifyContent: "center", spacing: 2, children: exchangeData.map((exchange, index) => (_jsxs(Grid, { item: true, xs: 12, children: [_jsxs(Grid, { container: true, spacing: 1, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Nazwa Gie\u0142dy", InputProps: {
                                                readOnly: exchange.isFromApi,
                                            }, value: exchange.name }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Adres URL gie\u0142dy", InputProps: {
                                                readOnly: exchange.isFromApi,
                                            }, value: exchange.address }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Kurs do PLN", InputProps: {
                                                readOnly: exchange.isFromApi,
                                            }, value: exchange.rateInPLN }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { fullWidth: true, label: "Kurs do USD", InputProps: {
                                                readOnly: exchange.isFromApi,
                                            }, value: exchange.rateInUSD }) })] }), _jsx("br", {})] }, index))) })] }) }));
}
export default CryptoApiCard;
