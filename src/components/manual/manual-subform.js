import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { Button, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useState } from "react";
import { useForm } from "react-hook-form";
const StyledForm = styled.form `
  display: flex;
  flex-direction: column;
  gap: 0.7em;
`;
function ManualSubForm(props) {
    const { register, handleSubmit, formState: { errors }, watch, } = useForm();
    const [isPLNField, setIsPLNField] = useState(false);
    const [buttonColor, setButtonColor] = useState("red");
    const [calculatedAmount, setCalculatedAmount] = useState(0);
    const onSubmit = (data) => {
        setButtonColor("green");
        props.onSubmit(data);
    };
    const handleAmountInput = (data) => {
        console.log(data.target.value, calculatedAmount);
        if (!isPLNField) {
            return;
        }
        setCalculatedAmount(data.target.value * props.rate);
    };
    // Sorry for that, but it's working i guess
    watch(('currency',
        (formState) => {
            if (formState.currency === 'USD') {
                setIsPLNField(true);
            }
            else {
                setIsPLNField(false);
            }
        }));
    return (_jsxs(StyledForm, { onSubmit: handleSubmit(onSubmit), onInvalid: () => console.log("XD"), children: [_jsx(TextField, { label: "Link do strony WWW", ...register('url', { required: true }) }), errors.url && _jsx("span", { children: "To pole jest wymagane" }), _jsx(TextField, { label: "Nazwa gieldy/kantoru", ...register('stockMarketName', { required: true }) }), _jsx(TextField, { type: "number", label: "Wolumen", ...register('volume', { required: true, valueAsNumber: true }) }), errors.url && _jsx("span", { children: "To pole jest wymagane" }), _jsxs("div", { children: [_jsx(TextField, { type: 'number', onInput: handleAmountInput, ...register('amount', { required: true, valueAsNumber: true }) }), _jsx("br", {}), isPLNField && (_jsx(TextField, { value: calculatedAmount, disabled: true, label: "PLN", sx: { my: 5 } })), _jsx(InputLabel, { id: "currency", children: "Waluta" }), _jsxs(Select, { labelId: "currency", id: "currency", ...register('currency'), label: "Waluta", defaultValue: "PLN", children: [_jsx(MenuItem, { value: "PLN", children: "PLN" }), _jsx(MenuItem, { value: "USD", children: "USD" })] })] }), _jsx(Button, { type: "submit", sx: { color: buttonColor }, children: "Zatwierdz" })] }));
}
export default ManualSubForm;
