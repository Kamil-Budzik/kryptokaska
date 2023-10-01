import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import { changeFormState } from '../store/manual';
import styled from '@emotion/styled';
import { useState } from 'react';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
`;

type Inputs = {
  url: string;
  stockMarketName: string;
  currency: string;
  amount: number;
};

function Manual() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [isPLNField, setIsPLNField] = useState(false);
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(changeFormState(data));
  };

  // Sorry for that, but it's working i guess
  watch(
    ('currency',
    (formState) => {
      if (formState.currency === 'USD') {
        setIsPLNField(true);
      } else {
        setIsPLNField(false);
      }
    }),
  );
  // TODO: add styles and proper validation
  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {/*TODO: possible validate if its URL */}
        <TextField
          label="Link do strony WWW"
          {...register('url', { required: true })}
        />
        {errors.url && <span>To pole jest wymagane</span>}

        <TextField
          label="Nazwa gieldy/kantoru"
          {...register('stockMarketName', { required: true })}
        />
        {errors.url && <span>To pole jest wymagane</span>}

        <div>
          <TextField
            {...register('amount', { required: true, valueAsNumber: true })}
          />
          <br />
          {/*TODO: pass dynamic value based on dolar's ratio */}
          {isPLNField && (
            <TextField value={111} disabled label="PLN" sx={{ my: 5 }} />
          )}
          <InputLabel id="currency">Waluta</InputLabel>
          <Select
            labelId="currency"
            id="currency"
            {...register('currency')}
            label="Waluta"
            defaultValue="PLN"
          >
            <MenuItem value="PLN">PLN</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </div>

        <Button type="submit">Zatwierdz</Button>
      </StyledForm>
    </>
  );
}

export default Manual;
