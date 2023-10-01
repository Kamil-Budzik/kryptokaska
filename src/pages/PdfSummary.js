import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Divider, Button } from "@mui/material";
import Wrapper from "../components/UI/Wrapper";
import { NavLink as Link } from 'react-router-dom';
//Prepare example data for PDFSummaryData
const exampleData = {
    generalData: [{
            name: "id",
            value: "qwertyuio"
        }, {
            name: "Data utworzenia",
            value: "03.09.2001"
        }, {
            name: "Numer Sprawy",
            value: "qwertyuio"
        },
        {
            name: "Dane właściciela",
            value: "qwertyuio"
        },
    ],
    cryptoSummaryData: [
        {
            crypto: {
                id: "1",
                fullName: "Bitcoin",
                shortName: "BTC"
            },
            amount: 1.5,
            sources: ["Coinbase", "Binance"],
            usdRate: 50000,
            averageValue: 75000
        },
        {
            crypto: {
                id: "2",
                fullName: "Ethereum",
                shortName: "ETH"
            },
            amount: 10,
            sources: ["Kraken", "Gemini"],
            usdRate: 3000,
            averageValue: 3500
        }
    ],
    stockMarketData: [
        {
            marketName: "NASDAQ",
            data: [
                {
                    crypto: {
                        id: "1",
                        fullName: "Bitcoin",
                        shortName: "BTC"
                    },
                    isAvaible: true,
                    rate: 50000,
                    currency: "USD",
                    valueInPLN: 123123,
                    totalValue: 250000
                },
                {
                    crypto: {
                        id: "2",
                        fullName: "Ethereum",
                        shortName: "ETH"
                    },
                    isAvaible: false,
                    rate: 3000,
                    currency: "USD",
                    valueInPLN: 1236,
                    totalValue: 0
                }
            ]
        },
        {
            marketName: "NYSE",
            data: [
                {
                    crypto: {
                        id: "1",
                        fullName: "Bitcoin",
                        shortName: "BTC"
                    },
                    isAvaible: true,
                    rate: 50000,
                    currency: "USD",
                    valueInPLN: 1233,
                    totalValue: 250000
                },
                {
                    crypto: {
                        id: "2",
                        fullName: "Ethereum",
                        shortName: "ETH"
                    },
                    isAvaible: true,
                    rate: 3000,
                    currency: "USD",
                    valueInPLN: 123,
                    totalValue: 30000
                }
            ]
        }
    ]
};
function PdfSummary() {
    const getStockDataForUnavailable = () => (_jsxs(_Fragment, { children: [_jsx(TableCell, { align: "left", children: "Nie" }), _jsx(TableCell, { align: "left", children: "-" }), _jsx(TableCell, { align: "left", children: "-" }), _jsx(TableCell, { align: "left", children: "-" }), _jsx(TableCell, { align: "left", children: "-" })] }));
    const getStockDataForAvailable = (data) => (_jsxs(_Fragment, { children: [_jsx(TableCell, { align: "left", children: "Tak" }), _jsx(TableCell, { align: "left", children: data.rate }), _jsx(TableCell, { align: "left", children: data.currency }), _jsx(TableCell, { align: "left", children: data.valueInPLN || "-" }), _jsx(TableCell, { align: "left", children: data.valueInPLN >= 0 ? "Tak" : "Nie" }), _jsx(TableCell, { align: "left", children: data.totalValue })] }));
    const getStockDataRow = (data) => {
        return data.isAvaible ? getStockDataForAvailable(data) : getStockDataForUnavailable();
    };
    const saveFile = () => {
        window.ipcRenderer.send("add-log", JSON.stringify(exampleData));
        window.ipcRenderer.send("print-to-pdf", exampleData.generalData[0].value);
    };
    return (_jsxs(Wrapper, { children: [_jsx("header", { children: _jsx(Typography, { component: "h1", variant: "h5", align: "center", children: "Szacowanie warto\u015Bci kryptoaktyw\u00F3w" }) }), _jsx(Typography, { component: "h1", variant: "h5", children: "Dane og\u00F3lne" }), _jsx(TableContainer, { children: _jsxs(Table, { "aria-label": "simple table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Nazwa pola" }), _jsx(TableCell, { align: "left", children: "Warto\u015B\u0107" })] }) }), _jsx(TableBody, { children: exampleData.generalData.map((row) => (_jsxs(TableRow, { sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsx(TableCell, { component: "th", scope: "row", children: row.name }), _jsx(TableCell, { align: "left", children: row.value })] }, row.name))) })] }) }), _jsx(Divider, {}), _jsx(Typography, { paddingTop: "50px", component: "h1", variant: "h5", children: "Warto\u015Bci kryptoaktyw\u00F3w" }), _jsx(TableContainer, { children: _jsxs(Table, { "aria-label": "simple table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Nazwa kryptoaktywa" }), _jsx(TableCell, { align: "left", children: "Ilo\u015B\u0107" }), _jsx(TableCell, { align: "left", children: "\u015Arednia warto\u015B\u0107" }), _jsx(TableCell, { align: "left", children: "\u0179r\u00F3d\u0142a" }), _jsx(TableCell, { align: "left", children: "Kurs USD wed\u0142ug NBP" })] }) }), _jsx(TableBody, { children: exampleData.cryptoSummaryData.map((row) => (_jsxs(TableRow, { sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsx(TableCell, { component: "th", scope: "row", children: row.crypto.fullName }), _jsx(TableCell, { align: "left", children: row.amount }), _jsx(TableCell, { align: "left", children: row.averageValue }), _jsx(TableCell, { align: "left", children: row.sources.join(", ") }), _jsx(TableCell, { align: "left", children: row.usdRate })] }, row.crypto.fullName))) })] }) }), _jsx(Divider, {}), _jsx(Typography, { paddingTop: "50px", component: "h1", variant: "h5", children: "Dane dotycz\u0105ce gie\u0142d i kantor\u00F3w" }), exampleData?.stockMarketData?.length || 0 > 0 &&
                _jsx(TableContainer, { children: _jsxs(Table, { "aria-label": "simple table", children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Nazwa gie\u0142dy" }), _jsx(TableCell, { align: "left", children: "Czy jest notowana" }), _jsx(TableCell, { align: "left", children: "Kurs" }), _jsx(TableCell, { align: "left", children: "Waluta" }), _jsx(TableCell, { align: "left", children: "Kurs w PLN (je\u015Bli dotyczy)" }), _jsx(TableCell, { align: "left", children: "Czy kurs zostal przeliczony z USD" }), _jsx(TableCell, { align: "left", children: "Warto\u015B\u0107 po przeliczeniu" })] }) }), _jsx(TableBody, { children: exampleData?.stockMarketData?.map((marketData) => (marketData.data.map((row, id) => (_jsxs(TableRow, { sx: { '&:last-child td, &:last-child th': { border: 0 } }, children: [_jsx(TableCell, { component: "th", scope: "row", children: id === 0 ? marketData.marketName : "" }), getStockDataRow(row)] }, marketData.marketName + row.crypto.fullName))))) })] }) }), _jsx(Typography, { paddingTop: "50px", component: "h1", variant: "h5", children: "Metodologia" }), _jsxs(Typography, { component: "p", variant: "body1", children: ["W celu precyzyjnego ustalenia kursu wymiany danego kryptoaktywa zastosowano kilkustiopniowy proces.", _jsx("br", {}), "1. W pierwszym kroku pobrane zostaj\u0105 \u015Brednie kursy oraz obroty z trzech gie\u0142d kryptowalutowych. Pobierany jest \u015Bredni kurs sprzeda\u017Cy z ostatnich 24 godzin oraz obr\u00F3t danym kryptoaktywem przez 24 godziny na danej gie\u0142dzie.", _jsx("br", {}), "2. Nast\u0119pnie przeprowadzana jest analiza statystyczna, w celu wykrycia tzw. outliers, czyli warto\u015Bci odstaj\u0105cych od normy. W tym kroku chcemy wykry\u0107 gie\u0142dy, na kt\u00F3rych obr\u00F3t danym kryptoaktywem jest zauwa\u017Calnie mniejszy, od pozosta\u0142ych. Wykonywane jest to poprzez obliczenie odchylenia standardowego, i \u015Bredniej, a nast\u0119pnie wszystkie warto\u015Bci, kt\u00F3re s\u0105 poni\u017Cej warto\u015Bci r\u00F3\u017Cnicy pomi\u0119dzy \u015Bredni\u0105 a odchyleniem standardowym zostaj\u0105 odrzucone jako outliers.", _jsx("br", {}), "3. Trzeci krok pozwala u\u017Cytkownikowi na dopisanie dodatkowych, nieuwzgl\u0119dnionych w aplikacji gie\u0142d oraz ich kurs\u00F3w.", _jsx("br", {}), "4. W ostatnim kroku liczona jest \u015Brednia wa\u017Cona kursu kryptoaktywa. \u015Arednia wa\u017Cona liczona jest w oparciu o \u015Bredni kurs sprzeda\u017Cy z ostatnich 24 godzin oraz obr\u00F3t dokonany przez ostatnie 24h danym kryptoaktywem."] }), _jsx(Button, { fullWidth: true, onClick: saveFile, variant: "contained", sx: { mt: 3, mb: 2, displayPrint: "none" }, style: { backgroundColor: 'green', color: 'white' }, children: "Zapisz do PDF" }), _jsx(Link, { to: "/", children: _jsx(Button, { fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2, displayPrint: "none" }, style: { backgroundColor: 'red', color: 'white' }, children: "Anuluj" }) })] }));
}
export default PdfSummary;
