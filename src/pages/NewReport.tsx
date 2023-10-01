import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Autocomplete, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Wrapper from '../components/UI/Wrapper';
import { useEffect, useState } from 'react';
import { CryptoEntry } from '../../electron/file-manager.ts';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { APIS } from '../integrations/axios/constants/Constants.ts';
import {NBPApi} from "../integrations/apis/nbp.ts";
import { changeFormState } from '../store/new-report';
import {ApiFacade} from "../integrations/interfaces/api.ts";

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

interface StockMarketCurrencyData {
    crypto: CryptoEntry;
    isAvailable: boolean;
    // wartosc wedlug gieldy
    rate: number;
    // waluta pln/uds
    currency: string;
    // wartosc w zlotowkach (kurs)
    plnCurrency: string;
    // wartosc waluty w przeliczneiu na zlotowki w sumie
    value: number;
}

interface StockMarketData {
    marketName: string;
    url: string;
    data: StockMarketCurrencyData[];
}

interface PDFSummaryData {
    generalData: GeneralData[];
    cryptoSummaryData: CryptoSummaryData[];
    stockMarketData: StockMarketData[];
}

type Inputs = {
  enforcementAuthority: string;
  caseNumber: string;
  cryptoCurrencyOwnerData: string;
  cryptoAssets: { cryptoAsset: string; amountOfCryptoAsset: string }[];
};

const INPUT_CANT_BE_EMPTY = 'Pole nie może być puste';
const INVALID_INPUT = 'Niewłaściwy format';

function NewReport() {
  const dispatch = useDispatch();
  const [headquarters, setHeadquarters] = useState<string[]>();
  const [availableCryptoCurrencies, setAvailableCryptoCurrencies] =
    useState<CryptoEntry[]>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      cryptoAssets: [{ cryptoAsset: '', amountOfCryptoAsset: '' }],
    },
  });

  useEffect(() => {
    window.ipcRenderer.send('load-headquarters');
    window.ipcRenderer.on('headquarters-loaded', (_event, arg) => {
      if (arg) setHeadquarters(arg);
    });
    window.ipcRenderer.send('get-available-cryptos');
    window.ipcRenderer.on('available-cryptos', (_event, arg) => {
      if (arg) {
        const cryptocurrencies = arg.map((crypto: CryptoEntry) => {
          return crypto.fullName + ' (' + crypto.shortName + ')';
        });
        setAvailableCryptoCurrencies(cryptocurrencies);
      }
    });
  }, []);

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'cryptoAssets',
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        dispatch(changeFormState(data));

        const nbp = new NBPApi()
        const cryptoApisFacade = new ApiFacade()

        const currentDate = new Date()

        const cryptoSummaryData: CryptoSummaryData[] = []
        await Promise.all(data.cryptoAssets.map(async value => {
            cryptoSummaryData.push({
                crypto: {
                    id: "-1",
                    fullName: value.cryptoAsset,
                    shortName: value.cryptoAsset
                },
                amount: Number(value.amountOfCryptoAsset),
                usdRate: await nbp.getNBPCurrencyExchangeRate("A", "USD"),
                sources: APIS.map(api => api.name),
                averageValue: -1
            })
        }))

        const stockMarketData: StockMarketData[] = []
        const stockMarketCryptoData: StockMarketCurrencyData[] = []

        await Promise.all(APIS.map(async (value) => {
            await Promise.all(data.cryptoAssets.map(async (crypto) => {
                const rate = await cryptoApisFacade.callApi(value.name, crypto.cryptoAsset);

                stockMarketCryptoData.push(
                    {
                        value: 1,
                        crypto: {
                            id: "-1",
                            shortName: crypto.cryptoAsset,
                            fullName: crypto.cryptoAsset
                        },
                        currency: "USD",
                        isAvailable: !!rate,
                        rate: rate?.OneDayPriceAverage ?? -1,
                        plnCurrency: (Number(crypto.amountOfCryptoAsset) * (rate?.OneDayPriceAverage ?? -1)).toString()
                    }
                )
            }))

            stockMarketData.push(
                {
                    marketName: value.name,
                    url: value.url,
                    data: stockMarketCryptoData
                }
            )
        }))

        const result: PDFSummaryData = {
            generalData: [
                { name: "id", value: currentDate.getTime().toString() + "-" + data.caseNumber },
                { name: "Data utworzenia", value: currentDate.toLocaleDateString() },
                { name: "Numer sprawy", value: data.caseNumber },
                { name: "Dane właściciela", value: data.cryptoCurrencyOwnerData }
            ],
            cryptoSummaryData,
            stockMarketData
        };
        console.log(result)
    }

  return (
    <Wrapper>
      <header>
        <Typography component="h1" variant="h5">
          Utwórz nowy raport
        </Typography>
      </header>
      <Divider />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              options={headquarters || []}
              id="clear-on-escape"
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  error={!!errors.enforcementAuthority}
                  helperText={errors.enforcementAuthority ? errors.enforcementAuthority.type == 'required' ? INPUT_CANT_BE_EMPTY : INVALID_INPUT : null}
                  fullWidth
                  id="enforcementAuthority"
                  label="Nazwa organu egzekucyjnego"
                  {...register('enforcementAuthority', { required: true,
                  validate: value => headquarters?.includes(value) || INVALID_INPUT})}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={!!errors.caseNumber}
              helperText={errors.caseNumber ? errors.caseNumber.type == 'required' ? INPUT_CANT_BE_EMPTY : INVALID_INPUT : null}
              fullWidth
              id="caseNumber"
              label="Numer sprawy"
              {...register('caseNumber', { required: true, pattern: /^[A-Za-z0-9./-]{1,100}$/i })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              error={!!errors.cryptoCurrencyOwnerData}
              helperText={errors.cryptoCurrencyOwnerData ? errors.cryptoCurrencyOwnerData.type == 'required' ? INPUT_CANT_BE_EMPTY : INVALID_INPUT : null}
              fullWidth
              id="cryptoCurrencyOwnerData"
              label="Dane identyfikujące właściciela kryptowaluty"
              {...register('cryptoCurrencyOwnerData', { required: true, pattern: /^[A-Za-z0-9.-]{1,100}$/i })}
            />
          </Grid>
          {fields.map((field, index) => (
            <Grid
              item
              xs={12}
              key={field.id}
              container
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={fields.length === 1 ? 6 : 5}>
                <Autocomplete
                  clearOnEscape
                  options={availableCryptoCurrencies || []}
                  id="clear-on-escape"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      fullWidth
                      label="Nazwa Kryptoaktywa"
                      {...register(`cryptoAssets.${index}.cryptoAsset`, {required: true})}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={fields.length === 1 ? 6 : 5}>
                <TextField
                  required
                  fullWidth
                  label="Ilość kryptoaktywów"
                  defaultValue={field.amountOfCryptoAsset}
                  {...register(`cryptoAssets.${index}.amountOfCryptoAsset`, {required: true, pattern: /^[0-9]+$/i })}
                />
              </Grid>
              {fields.length > 1 && (
                <Grid item xs={2}>
                  <Button
                    type="button"
                    color="warning"
                    variant="contained"
                    onClick={() => remove(index)}
                  >
                    Usuń
                  </Button>
                </Grid>
              )}
            </Grid>
          ))}
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                append({ cryptoAsset: '', amountOfCryptoAsset: '' })
              }
            >
              + Dodaj kryptoaktywo
            </Button>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: 'green', color: 'white' }}
        >
          Generuj Raport
        </Button>
        <Button>
          <Link to="/manual">Wprowadz dane recznie</Link>
        </Button>
      </Box>
    </Wrapper>
  );
}

export default NewReport;
