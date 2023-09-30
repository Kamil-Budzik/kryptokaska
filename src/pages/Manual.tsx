import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';

const REQUIRED_FIELD_MSG = 'To pole jest wymagane';

const schema = yup
  .object({
    url: yup.string().url().required(REQUIRED_FIELD_MSG),
    stockMarketName: yup
      .number()
      .positive()
      .integer()
      .required(REQUIRED_FIELD_MSG),
    cryptocurrencyRate: yup.number().positive().required(REQUIRED_FIELD_MSG),
    currency: yup.string().required(REQUIRED_FIELD_MSG),
  })
  .required();

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function Manual() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth>
        <TextField {...register('url')} label="Adres URL giełdy/kantoru" />
        <Typography>{errors.url?.message}</Typography>
      </FormControl>

      <FormControl fullWidth>
        <TextField
          {...register('stockMarketName')}
          label="Nazwa giełdy/kantoru"
        />
      </FormControl>
      <p>{errors.stockMarketName?.message}</p>

      <FormControl fullWidth>
        <TextField
          {...register('cryptocurrencyRate')}
          label="Kurs Kryptowaluty"
        />
      </FormControl>
      <p>{errors.cryptocurrencyRate?.message}</p>

      <FormControl fullWidth>
        <InputLabel id="currency">Waluta</InputLabel>
        <Select
          labelId="currency"
          id="currency"
          {...register('currency')}
          label="Waluta"
          defaultValue="PLN"
        >
          <MenuItem value="PLN" defaultChecked>
            PLN
          </MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary">
        Zatwierdź
      </Button>
    </StyledForm>
  );
}

export default Manual;
