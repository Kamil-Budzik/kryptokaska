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
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    console.log(lastClickedButton);
    dispatch(changeFormState(data));
  };

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
                      {...register(`cryptoAssets.${index}.cryptoAsset`, { required: true })}
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
