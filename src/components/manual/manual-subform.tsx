/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Button, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import styled from '@emotion/styled';

import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
`;

export type Inputs = {
    url: string;
    stockMarketName: string;
    volume: number;
    currency: string;
    amount: number;
    plnAmount?: number;
};

function ManualSubForm(props: { rate: number, onSubmit: (data: Inputs) => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,

    } = useForm<Inputs>();

    const [isPLNField, setIsPLNField] = useState(false);
    const [buttonColor, setButtonColor] = useState("red");
    const [calculatedAmount, setCalculatedAmount] = useState(0);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setButtonColor("green");

        props.onSubmit(data)
    };

    const handleAmountInput = (data: any ) => {
        console.log(data.target.value, calculatedAmount)
        if (!isPLNField) {
            return;
        }

        setCalculatedAmount(data.target.value * props.rate);
    }

    // Sorry for that, but it's working i guess
    watch(
        ('currency',
            (formState) => {
                console.log("XD");
                if (formState.currency === 'USD') {
                    setIsPLNField(true);
                } else {
                    setIsPLNField(false);
                }
            }),
    );

    return (
        <StyledForm onSubmit={handleSubmit(onSubmit)} onInvalid={() => console.log("XD")}>
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

            <TextField
                type="number"
                label="Wolumen"
                {...register('volume', { required: true, valueAsNumber: true })}
            />
            {errors.url && <span>To pole jest wymagane</span>}

            <div>
                <TextField type='number' onInput={handleAmountInput} {...register('amount', { required: true, valueAsNumber: true })} />
                <br />
                {/*TODO: pass dynamic value based on dolar's ratio */}
                {isPLNField && (
                    <TextField value={calculatedAmount} disabled label="PLN" sx={{ my: 5 }} />
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

            <Button type="submit" sx={{ color: buttonColor }}>Zatwierdz</Button>
        </StyledForm>
    );
}

export default ManualSubForm;