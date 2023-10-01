import {Card, CardContent, Grid} from '@mui/material';
import {CryptoEntry} from "../../../electron/file-manager.ts";
import CryptoApiCardHeader from "./CryptoApiCardHeader.tsx";
import TextField from "@mui/material/TextField";

interface CryptoApiItem {
    crypto: CryptoEntry;
    amount: number;
    dateAndTime: string;
    exchangeData: ExchangeApiSummary[];
}

interface ExchangeApiSummary {
    isFromApi: boolean;
    name: string;
    address: string;
    rateInPLN: string;
    rateInUSD?: string;
}

function CryptoApiCard({crypto, amount, dateAndTime, exchangeData}: CryptoApiItem) {
    return (
        <Card variant="outlined">
            <CardContent>
                <CryptoApiCardHeader crypto={crypto} amount={amount} dateAndTime={dateAndTime}/>
                <br/>
                <hr/>
                <br/>
                <Grid container justifyContent="center" spacing={2}>
                    {
                        exchangeData.map(
                            (exchange, index) => (
                                <Grid item key={index} xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Nazwa Giełdy"
                                                InputProps={{
                                                    readOnly: exchange.isFromApi,
                                                }}
                                                value={exchange.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Adres URL giełdy"
                                                InputProps={{
                                                    readOnly: exchange.isFromApi,
                                                }}
                                                value={exchange.address}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Kurs do PLN"
                                                InputProps={{
                                                    readOnly: exchange.isFromApi,
                                                }}
                                                value={exchange.rateInPLN}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Kurs do USD"
                                                InputProps={{
                                                    readOnly: exchange.isFromApi,
                                                }}
                                                value={exchange.rateInUSD}
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                </Grid>
                            )
                        )
                    }
                </Grid>
            </CardContent>
        </Card>
    );
}

export default CryptoApiCard;
