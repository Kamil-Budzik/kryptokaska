import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { Autocomplete, Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Wrapper from '../components/UI/Wrapper';
import { useEffect, useState } from 'react';
import { CryptoEntry } from '../../electron/file-manager.ts';
import { useDispatch } from 'react-redux';
import { changeFormState } from '../store/new-report';
import { changeFormState as changeCryptoFormState} from '../store//crypto';
import { useNavigate } from 'react-router-dom';
import { NBPApi } from "../integrations/apis/nbp.ts";
import { ApiFacade } from "../integrations/interfaces/api.ts";
import {APIS, CRYPTO_CURRENCIES} from "../integrations/axios/constants/Constants.ts";

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
  isFromApi: boolean;
  // wartosc wedlug gieldy
  rateInUSD: number;
  // waluta pln/uds
  currency: string;
  // wartosc w zlotowkach (kurs)
  rateInPLN: string;
  // wartosc waluty w przeliczneiu na zlotowki w sumie
  value: number;
  amount: number;
}

interface StockMarketData {
  name: string;
  address: string;
  data: StockMarketCurrencyData[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface PDFSummaryData {
  generalData: GeneralData[];
  cryptoSummaryData: CryptoSummaryData[];
  stockMarketData: StockMarketData[];
}

export type Inputs = {
  enforcementAuthority: string;
  caseNumber: string;
  cryptoCurrencyOwnerData: string;
  cryptoAssets: { cryptoAsset: string; amountOfCryptoAsset: string }[];
};

const INPUT_CANT_BE_EMPTY = 'Pole nie może być puste';
const INVALID_INPUT = 'Niewłaściwy format';

function NewReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [headquarters, setHeadquarters] = useState<string[]>();
  const [lastClickedButton, setLastClickedButton] = useState<string>();
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cryptoAssets',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    dispatch(changeFormState(data));
    if (lastClickedButton === "generate") {
      navigate("/api-summary")
    }
    else if (lastClickedButton === "manual") {
      navigate("/manual")
    }

        const nbp = new NBPApi()
        const exchangeRate = await nbp.getNBPCurrencyExchangeRate("A", "USD")

        const cryptoApisFacade = new ApiFacade()

        const currentDate = new Date()

        const cryptoSummaryData: CryptoSummaryData[] = []
        await Promise.all(data.cryptoAssets.map(async value => {
            cryptoSummaryData.push({
                crypto: {
                    id: "-1",
                    fullName: CRYPTO_CURRENCIES.find(constCurr => constCurr.uiName === value.cryptoAsset)?.name ?? "not found",
                    shortName: CRYPTO_CURRENCIES.find(constCurr => constCurr.uiName === value.cryptoAsset)?.shortcut ?? "not found",
                },
                amount: Number(value.amountOfCryptoAsset),
                usdRate: exchangeRate,
                sources: APIS.map(api => api.name),
                averageValue: -1
            })
        }))

        console.log('cryptoSummaryData')
        console.log(cryptoSummaryData)

        const stockMarketData: StockMarketData[] = []

        if(lastClickedButton === "manual") {

        let stockMarketCryptoData: StockMarketCurrencyData[] = []

        for (const value of APIS) {

            for (const crypto of data.cryptoAssets) {

                console.log(value.name + " --- " + crypto.cryptoAsset + " --- " + stockMarketCryptoData.length)

                const rate = await cryptoApisFacade.callApi(value.name,
                    CRYPTO_CURRENCIES.find(constCurr=>
                        constCurr.uiName === crypto.cryptoAsset)?.shortcut ?? "not found");

                stockMarketCryptoData.push(
                    {
                        value: 1,
                        crypto: {
                            id: "-1",
                            shortName: CRYPTO_CURRENCIES.find(constCurr =>
                                constCurr.uiName === crypto.cryptoAsset)?.shortcut ?? "not found",
                            fullName: CRYPTO_CURRENCIES.find(constCurr =>
                                constCurr.uiName === crypto.cryptoAsset)?.name ?? "not found"
                        },
                        currency: "USD",
                        isFromApi: !!rate,
                        rateInUSD: rate?.OneDayPriceAverage ?? -1,
                        rateInPLN: (exchangeRate * (rate?.OneDayPriceAverage ?? -1)).toString(),
                        amount: Number(crypto.amountOfCryptoAsset)
                    }
                )
            }

            stockMarketData.push(
                {
                    name: value.name,
                    address: value.url,
                    data: [ ...stockMarketCryptoData ]
                }
            )

            stockMarketCryptoData = []
        }
      }

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

        dispatch(changeCryptoFormState(result as any))
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
                  {...register('enforcementAuthority', {
                    required: true,
                    validate: value => headquarters?.includes(value) || INVALID_INPUT
                  })}
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
              {...register('cryptoCurrencyOwnerData', { required: true, pattern: /^[a-zA-Z0-9.\s]{1,100}$/i })}
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
                      {...register(`cryptoAssets.${index}.cryptoAsset`, { required: true })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={fields.length === 1 ? 6 : 5}>
                <TextField
                  required
                  fullWidth
                  type="number"
                  label="Ilość kryptoaktywów"
                  defaultValue={field.amountOfCryptoAsset}
                  {...register(`cryptoAssets.${index}.amountOfCryptoAsset`, { required: true, pattern: /^[0-9]+$/i })}
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
          onClick={() => setLastClickedButton("generate")}
          style={{ backgroundColor: 'green', color: 'white' }}
        >
          Generuj Raport
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setLastClickedButton("manual")}
          style={{ backgroundColor: 'blue', color: 'white' }}
        >
          Wprowadz dane recznie
        </Button>
      </Box>
    </Wrapper>
  );
}

export default NewReport;
