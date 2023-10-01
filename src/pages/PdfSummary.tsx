import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Divider, Button } from "@mui/material";
import Wrapper from "../components/UI/Wrapper";
import { Container } from "@mui/system";
import { CryptoEntry } from "../../electron/file-manager";
import { NavLink as Link } from 'react-router-dom';


interface GeneralData {
    name: string;
    value: string;
}

interface CryptoSummaryData {
    crypto: CryptoEntry;
    amount: number;
    sources: string[];
    usdRate: number;
    averageValue: number;
}

interface StockMarketData {
    marketName: string;
    data: StockMarketDataEntry[]
}

interface StockMarketDataEntry {
    crypto: CryptoEntry;
    isAvaible: boolean;
    rate: number;
    currency: string;
    valueInPLN: number;
    totalValue: number
}

interface PDFSummaryData {
    generalData: GeneralData[];
    cryptoSummaryData: CryptoSummaryData[];
    stockMarketData: StockMarketData[];
}

//Prepare example data for PDFSummaryData
const exampleData: PDFSummaryData = {
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
    const getStockDataForUnavailable = () => (
        <>
            <TableCell align="left">Nie</TableCell>
            <TableCell align="left">-</TableCell>
            <TableCell align="left">-</TableCell>
            <TableCell align="left">-</TableCell>
            <TableCell align="left">-</TableCell>
        </>
    );

    const getStockDataForAvailable = (data: StockMarketDataEntry) => (
        <>
            <TableCell align="left">Tak</TableCell>
            <TableCell align="left">{data.rate}</TableCell>
            <TableCell align="left">{data.currency}</TableCell>
            <TableCell align="left">{data.valueInPLN || "-"}</TableCell>
            <TableCell align="left">{data.valueInPLN >= 0 ? "Tak" : "Nie"}</TableCell>
            <TableCell align="left">{data.totalValue}</TableCell>
        </>
    );
    const getStockDataRow = (data: StockMarketDataEntry) => {
        return data.isAvaible ? getStockDataForAvailable(data) : getStockDataForUnavailable();
    }

    const saveFile = () => {
        window.ipcRenderer.send("print-to-pdf");
    };

    return (
        <Container>
            <Wrapper>
                <header>
                    <Typography component="h1" variant="h5" align="center">
                        Szacowanie wartości kryptoaktywów
                    </Typography>
                </header>
                <Typography component="h1" variant="h5">
                    Dane ogólne
                </Typography>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nazwa pola</TableCell>
                                <TableCell align="left">Wartość</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exampleData.generalData.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">{row.value}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
                <Typography paddingTop="50px" component="h1" variant="h5">
                    Wartości kryptoaktywów
                </Typography>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nazwa kryptoaktywa</TableCell>
                                <TableCell align="left">Ilość</TableCell>
                                <TableCell align="left">Średnia wartość</TableCell>
                                <TableCell align="left">Źródła</TableCell>
                                <TableCell align="left">Kurs USD według NBP</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exampleData.cryptoSummaryData.map((row) => (
                                <TableRow
                                    key={row.crypto.fullName}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.crypto.fullName}
                                    </TableCell>
                                    <TableCell align="left">{row.amount}</TableCell>
                                    <TableCell align="left">{row.averageValue}</TableCell>
                                    <TableCell align="left">{row.sources.join(", ")}</TableCell>
                                    <TableCell align="left">{row.usdRate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
                <Typography paddingTop="50px" component="h1" variant="h5">
                    Dane dotyczące giełd i kantorów
                </Typography>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nazwa giełdy</TableCell>
                                <TableCell align="left">Czy jest notowana</TableCell>
                                <TableCell align="left">Kurs</TableCell>
                                <TableCell align="left">Waluta</TableCell>
                                <TableCell align="left">Kurs w PLN (jeśli dotyczy)</TableCell>
                                <TableCell align="left">Czy kurs zostal przeliczony z USD</TableCell>
                                <TableCell align="left">Wartość po przeliczeniu</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exampleData.stockMarketData.map((marketData) => (
                                marketData.data.map((row, id) => (
                                    <TableRow
                                        key={marketData.marketName + row.crypto.fullName}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row">
                                            {id === 0 ? marketData.marketName : ""}
                                        </TableCell>
                                        {getStockDataRow(row)}
                                    </TableRow>
                                )
                                )
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography paddingTop="50px" component="h1" variant="h5">
                    Dane dodatkowe
                </Typography>
                <Typography component="p" variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, quos dolorum. Quod, quaerat. Quisquam, voluptate. Quisquam, unde. Voluptatem, voluptatibus? Quia, id? Quam, natus? Quisquam, voluptatum. Natus, quia. Quo, quos dolorum. Quod, quaerat. Quisquam, voluptate. Quisquam, unde. Voluptatem, voluptatibus? Quia, id? Quam, natus? Quisquam, voluptatum. Natus, quia.
                    Quo, quos dolorum. Quod, quaerat. Quisquam, voluptate. Quisquam, unde. Voluptatem, voluptatibus? Quia, id? Quam, natus? Quisquam, voluptatum. Natus, quia. Quo, quos dolorum. Quod, quaerat. Quisquam, voluptate. Quisquam, unde. Voluptatem, voluptatibus? Quia, id? Quam, natus? Quisquam, voluptatum. Natus, quia.
                    Quo, quos dolorum. Quod, quaerat. Quisquam, voluptate. Quisquam, unde. Voluptatem, voluptatibus? Quia, id? Quam, natus? Quisquam, voluptatum. Natus, quia. Quo, quos dolorum. Quod, quaerat. Quisquam, voluptate. Quisquam, unde. Voluptatem, voluptatibus? Quia, id? Quam, natus? Quisquam, voluptatum. Natus, quia.
                </Typography>
                <Button
                    fullWidth
                    onClick={saveFile}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, displayPrint: "none" }}
                    style={{ backgroundColor: 'green', color: 'white' }}
                    >
                    Zapisz do PDF
                </Button>
                <Link to="/">
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, displayPrint: "none" }}
                        style={{ backgroundColor: 'red', color: 'white' }}
                        >
                        Anuluj
                    </Button>
                </Link>
            </Wrapper>
        </Container>
    )
}

export default PdfSummary;