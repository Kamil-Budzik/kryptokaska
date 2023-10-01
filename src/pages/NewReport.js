import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, useFieldArray } from 'react-hook-form';
import { Autocomplete, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Wrapper from '../components/UI/Wrapper';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeFormState } from '../store/new-report';
import { useNavigate } from 'react-router-dom';
const INPUT_CANT_BE_EMPTY = 'Pole nie może być puste';
const INVALID_INPUT = 'Niewłaściwy format';
function NewReport() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [headquarters, setHeadquarters] = useState();
    const [lastClickedButton, setLastClickedButton] = useState();
    const [availableCryptoCurrencies, setAvailableCryptoCurrencies] = useState();
    const { register, control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            cryptoAssets: [{ cryptoAsset: '', amountOfCryptoAsset: '' }],
        },
    });
    useEffect(() => {
        window.ipcRenderer.send('load-headquarters');
        window.ipcRenderer.on('headquarters-loaded', (_event, arg) => {
            if (arg)
                setHeadquarters(arg);
        });
        window.ipcRenderer.send('get-available-cryptos');
        window.ipcRenderer.on('available-cryptos', (_event, arg) => {
            if (arg) {
                const cryptocurrencies = arg.map((crypto) => {
                    return crypto.fullName + ' (' + crypto.shortName + ')';
                });
                setAvailableCryptoCurrencies(cryptocurrencies);
            }
        });
    }, []);
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'cryptoAssets',
    });
    const onSubmit = async (data) => {
        dispatch(changeFormState(data));
        if (lastClickedButton === "generate") {
            navigate("/api-summary");
        }
        else if (lastClickedButton === "manual") {
            navigate("/manual");
        }
        // const nbp = new NBPApi()
        // const cryptoApisFacade = new ApiFacade()
        // const currentDate = new Date()
        // const cryptoSummaryData: CryptoSummaryData[] = []
        // await Promise.all(data.cryptoAssets.map(async value => {
        //     cryptoSummaryData.push({
        //         crypto: {
        //             id: "-1",
        //             fullName: value.cryptoAsset,
        //             shortName: value.cryptoAsset
        //         },
        //         amount: Number(value.amountOfCryptoAsset),
        //         usdRate: await nbp.getNBPCurrencyExchangeRate("A", "USD"),
        //         sources: APIS.map(api => api.name),
        //         averageValue: -1
        //     })
        // }))
        // const stockMarketData: StockMarketData[] = []
        // const stockMarketCryptoData: StockMarketCurrencyData[] = []
        // await Promise.all(APIS.map(async (value) => {
        //     await Promise.all(data.cryptoAssets.map(async (crypto) => {
        //         const rate = await cryptoApisFacade.callApi(value.name, crypto.cryptoAsset);
        //         stockMarketCryptoData.push(
        //             {
        //                 value: 1,
        //                 crypto: {
        //                     id: "-1",
        //                     shortName: crypto.cryptoAsset,
        //                     fullName: crypto.cryptoAsset
        //                 },
        //                 currency: "USD",
        //                 isAvailable: !!rate,
        //                 rate: rate?.OneDayPriceAverage ?? -1,
        //                 plnCurrency: (Number(crypto.amountOfCryptoAsset) * (rate?.OneDayPriceAverage ?? -1)).toString()
        //             }
        //         )
        //     }))
        //     stockMarketData.push(
        //         {
        //             marketName: value.name,
        //             url: value.url,
        //             data: stockMarketCryptoData
        //         }
        //     )
        // }))
        // const result: PDFSummaryData = {
        //     generalData: [
        //         { name: "id", value: currentDate.getTime().toString() + "-" + data.caseNumber },
        //         { name: "Data utworzenia", value: currentDate.toLocaleDateString() },
        //         { name: "Numer sprawy", value: data.caseNumber },
        //         { name: "Dane właściciela", value: data.cryptoCurrencyOwnerData }
        //     ],
        //     cryptoSummaryData,
        //     stockMarketData
        // };
        // console.log(result)
    };
    return (_jsxs(Wrapper, { children: [_jsx("header", { children: _jsx(Typography, { component: "h1", variant: "h5", children: "Utw\u00F3rz nowy raport" }) }), _jsx(Divider, {}), _jsxs(Box, { component: "form", noValidate: true, onSubmit: handleSubmit(onSubmit), sx: { mt: 3 }, children: [_jsxs(Grid, { container: true, justifyContent: "center", spacing: 2, children: [_jsx(Grid, { item: true, xs: 12, children: _jsx(Autocomplete, { freeSolo: true, options: headquarters || [], id: "clear-on-escape", renderInput: (params) => (_jsx(TextField, { ...params, required: true, error: !!errors.enforcementAuthority, helperText: errors.enforcementAuthority ? errors.enforcementAuthority.type == 'required' ? INPUT_CANT_BE_EMPTY : INVALID_INPUT : null, fullWidth: true, id: "enforcementAuthority", label: "Nazwa organu egzekucyjnego", ...register('enforcementAuthority', {
                                            required: true,
                                            validate: value => headquarters?.includes(value) || INVALID_INPUT
                                        }) })) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, error: !!errors.caseNumber, helperText: errors.caseNumber ? errors.caseNumber.type == 'required' ? INPUT_CANT_BE_EMPTY : INVALID_INPUT : null, fullWidth: true, id: "caseNumber", label: "Numer sprawy", ...register('caseNumber', { required: true, pattern: /^[A-Za-z0-9./-]{1,100}$/i }) }) }), _jsx(Grid, { item: true, xs: 12, children: _jsx(TextField, { required: true, error: !!errors.cryptoCurrencyOwnerData, helperText: errors.cryptoCurrencyOwnerData ? errors.cryptoCurrencyOwnerData.type == 'required' ? INPUT_CANT_BE_EMPTY : INVALID_INPUT : null, fullWidth: true, id: "cryptoCurrencyOwnerData", label: "Dane identyfikuj\u0105ce w\u0142a\u015Bciciela kryptowaluty", ...register('cryptoCurrencyOwnerData', { required: true, pattern: /^[A-Za-z0-9.-]{1,100}$/i }) }) }), fields.map((field, index) => (_jsxs(Grid, { item: true, xs: 12, container: true, spacing: 2, alignItems: "center", children: [_jsx(Grid, { item: true, xs: fields.length === 1 ? 6 : 5, children: _jsx(Autocomplete, { clearOnEscape: true, options: availableCryptoCurrencies || [], id: "clear-on-escape", renderInput: (params) => (_jsx(TextField, { ...params, required: true, fullWidth: true, label: "Nazwa Kryptoaktywa", ...register(`cryptoAssets.${index}.cryptoAsset`, { required: true }) })) }) }), _jsx(Grid, { item: true, xs: fields.length === 1 ? 6 : 5, children: _jsx(TextField, { required: true, fullWidth: true, type: "number", label: "Ilo\u015B\u0107 kryptoaktyw\u00F3w", defaultValue: field.amountOfCryptoAsset, ...register(`cryptoAssets.${index}.amountOfCryptoAsset`, { required: true, pattern: /^[0-9]+$/i }) }) }), fields.length > 1 && (_jsx(Grid, { item: true, xs: 2, children: _jsx(Button, { type: "button", color: "warning", variant: "contained", onClick: () => remove(index), children: "Usu\u0144" }) }))] }, field.id))), _jsx(Grid, { item: true, xs: 6, children: _jsx(Button, { variant: "contained", color: "primary", onClick: () => append({ cryptoAsset: '', amountOfCryptoAsset: '' }), children: "+ Dodaj kryptoaktywo" }) })] }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 }, onClick: () => setLastClickedButton("generate"), style: { backgroundColor: 'green', color: 'white' }, children: "Generuj Raport" }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 }, onClick: () => setLastClickedButton("manual"), style: { backgroundColor: 'blue', color: 'white' }, children: "Wprowadz dane recznie" })] })] }));
}
export default NewReport;
