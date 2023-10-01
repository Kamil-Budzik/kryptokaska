import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { Button, Input } from '@mui/material';
import { StyledForm } from './styles.ts';
const SettingsForm = ({ handleAddition, }) => {
    const { formState: { errors }, reset, handleSubmit, register, } = useForm();
    const onSubmit = (data) => {
        handleAddition(data.shortName, data.fullName);
        reset();
    };
    return (_jsxs(StyledForm, { onSubmit: handleSubmit(onSubmit), children: [_jsx(Input, { ...register('shortName', { required: true }), placeholder: "symbol" }), _jsx(Input, { ...register('fullName', { required: true }), placeholder: "nazwa" }), _jsx(Button, { type: "submit", disabled: errors.shortName || errors.longName, children: "Dodaj" })] }));
};
export default SettingsForm;
