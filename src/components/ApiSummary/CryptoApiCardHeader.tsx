import {Grid, Typography} from '@mui/material';
import {CryptoEntry} from "../../../electron/file-manager.ts";

function CryptoApiCardHeader(props: { crypto: CryptoEntry, amount: number, dateAndTime: string }) {
    return (
        <Grid container justifyContent="center" spacing={2} alignItems="center">
            <Grid xs={4}>
                <Typography component="h5">
                    {`Nazwa kryptoaktywa: `}
                    <span style={{fontWeight: 'bold'}}>
                                {`${props.crypto.fullName} (${props.crypto.shortName})`}
                            </span>
                </Typography>
            </Grid>
            <Grid xs={4}>
                <Typography component="h5">
                    {`Ilość: `}
                    <span style={{fontWeight: 'bold'}}>
                                {`${props.amount}`}
                            </span>
                </Typography>
            </Grid>
            <Grid xs={4}>
                <Typography component="h5">
                    {`Data: `}
                    <span style={{fontWeight: 'bold'}}>
                                {`${props.dateAndTime}`}
                            </span>
                </Typography>
            </Grid>
        </Grid>
    );
}

export default CryptoApiCardHeader;
