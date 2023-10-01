import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ManualSubFormSet from '../components/manual/manual-subform-set';
import { Button } from '@mui/material';
import Wrapper from '../components/UI/Wrapper';
import { changeFormState } from '../store/manual';
function Manual() {
    // const myData = useSelector((state) => state.myData);
    const manualState = useSelector((state) => state.newReport);
    const [rateData, setRateData] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [rate, _setRate] = useState(4);
    const dispatch = useDispatch();
    const handleSubmit = (id) => (input) => {
        console.log(id, input, rateData);
        setRateData((prev) => {
            prev[id] = input;
            return prev;
        });
    };
    useEffect(() => {
        console.log(manualState);
    }, []);
    const handleButtonClick = () => {
        const count = rateData.flatMap((rateData) => rateData).filter(item => item).length;
        const desiredCount = manualState.cryptoAssets.filter(item => item.cryptoAsset).length * 3;
        console.log(rateData, manualState);
        console.log(count, desiredCount);
        if (count !== desiredCount) {
            setErrorMessage("Wypełnij wszystkie pola");
            return;
        }
        const newData = rateData.map((rateData) => rateData.map((innerRateData) => {
            if (innerRateData.currency === "USD") {
                innerRateData.plnAmount = innerRateData.amount * rate;
            }
            return innerRateData;
        }));
        console.log(newData);
        dispatch(changeFormState({
            states: newData
        }));
    };
    // TODO: add styles and proper validation
    return (_jsxs(Wrapper, { children: [manualState.cryptoAssets.map((cryptoEntry, id) => (_jsx(ManualSubFormSet, { onSubmit: handleSubmit(id), rate: 123, crypto: cryptoEntry }, JSON.stringify(cryptoEntry) + "id"))), _jsx("div", { style: { color: 'red' }, children: errorMessage }), _jsx(Button, { type: "button", fullWidth: true, variant: "contained", sx: { mt: 3, mb: 2 }, onClick: handleButtonClick, style: { backgroundColor: 'green', color: 'white' }, children: "Przejd\u017A dalej" })] }));
}
export default Manual;
