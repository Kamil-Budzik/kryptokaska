import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Typography } from "@mui/material";
import ManualSubForm from "./manual-subform";
import { useState } from "react";
function ManualSubFormSet(props) {
    const [rateData, setRateData] = useState([]);
    const handleSubmit = (id) => (input) => {
        console.log(id, input, rateData);
        setRateData(prev => {
            prev[id] = input;
            return prev;
        });
        props.onSubmit(rateData);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Typography, { sx: { mt: 10 }, variant: "h5", children: ["Wprowad\u017A dane dla waluty ", props.crypto.cryptoAsset] }), _jsx(ManualSubForm, { rate: props.rate, onSubmit: handleSubmit(0) }), _jsx(ManualSubForm, { rate: props.rate, onSubmit: handleSubmit(1) }), _jsx(ManualSubForm, { rate: props.rate, onSubmit: handleSubmit(2) })] }));
}
export default ManualSubFormSet;
