import {useForm, SubmitHandler, useFieldArray} from "react-hook-form"
import {Button, Divider, Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Wrapper from '../components/UI/Wrapper';


type Inputs = {
    enforcementAuthority: string
    caseNumber: string
    cryptoCurrencyOwnerData: string
    cryptoAssets: { cryptoAsset: string; amountOfCryptoAsset: string }[];
}

function NewReport() {
    const INPUT_CANT_BE_EMPTY = "Pole nie może być puste";
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>({
        defaultValues: {
            cryptoAssets: [{cryptoAsset: '', amountOfCryptoAsset: ''}],
        },
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'cryptoAssets',
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


    return (
        <Wrapper>
            <header>
                <Typography component="h1" variant="h5">
                    Utwórz nowy raport
                </Typography>
            </header>
            <Divider/>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            error={!!errors.enforcementAuthority}
                            helperText={errors.enforcementAuthority ? INPUT_CANT_BE_EMPTY : undefined}
                            fullWidth
                            id="enforcementAuthority"
                            label="Nazwa organu egzekucyjnego"
                            {...register("enforcementAuthority", {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            error={!!errors.caseNumber}
                            helperText={errors.caseNumber ? INPUT_CANT_BE_EMPTY : undefined}
                            fullWidth
                            id="caseNumber"
                            label="Numer sprawy"
                            {...register("caseNumber", {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            error={!!errors.cryptoCurrencyOwnerData}
                            helperText={errors.cryptoCurrencyOwnerData ? INPUT_CANT_BE_EMPTY : undefined}
                            fullWidth
                            id="cryptoCurrencyOwnerData"
                            label="Dane identyfikujące właściciela kryptowaluty"
                            {...register("cryptoCurrencyOwnerData", {required: true})}
                        />
                    </Grid>
                    {fields.map((field, index) => (
                        <Grid item xs={12} key={field.id} container spacing={2} alignItems = "center">
                            <Grid item xs={fields.length === 1 ? 6 : 5}>
                                <TextField
                                    fullWidth
                                    label="Nazwa Kryptoaktywa"
                                    defaultValue={field.cryptoAsset}
                                    {...register(`cryptoAssets.${index}.cryptoAsset`)}
                                />
                            </Grid>
                            <Grid item xs={fields.length === 1 ? 6 : 5}>
                                <TextField
                                    fullWidth
                                    label="Ilość kryptoaktywów"
                                    defaultValue={field.amountOfCryptoAsset}
                                    {...register(`cryptoAssets.${index}.amountOfCryptoAsset`)}
                                />
                            </Grid>
                            {fields.length > 1 && (
                            <Grid item xs={2}>
                                <Button type="button" color="warning" variant="contained" onClick={() => remove(index)}>
                                    Usuń
                                </Button>
                            </Grid>)}
                        </Grid>
                    ))}
                    <Grid item xs={6}>
                        <Button variant="contained" color="primary"
                                onClick={() => append({cryptoAsset: '', amountOfCryptoAsset: ''})}>
                            + Dodaj kryptoaktywo
                        </Button>
                    </Grid>
                    {/*<Grid item xs={6}>*/}
                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        error={!!errors.cryptoAsset}*/}
                    {/*        helperText={errors.cryptoAsset ? INPUT_CANT_BE_EMPTY : undefined}*/}
                    {/*        fullWidth*/}
                    {/*        id="cryptoAsset"*/}
                    {/*        label="Nazwa kryptoaktywa"*/}
                    {/*        {...register("cryptoAsset", {required: true})}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={6}>*/}
                    {/*    <TextField*/}
                    {/*        required*/}
                    {/*        error={!!errors.amountOfCryptoAsset}*/}
                    {/*        helperText={errors.amountOfCryptoAsset ? INPUT_CANT_BE_EMPTY : undefined}*/}
                    {/*        fullWidth*/}
                    {/*        id="amountOfCryptoAsset"*/}
                    {/*        label="Ilość kryptoaktywów"*/}
                    {/*        {...register("amountOfCryptoAsset", {required: true})}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                    style={{backgroundColor: 'green', color: 'white'}}
                >
                    Generuj Raport
                </Button>
            </Box>
        </Wrapper>
    )
}

export default NewReport;
