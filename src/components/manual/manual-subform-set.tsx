
import { Typography } from "@mui/material";

import ManualSubForm, { Inputs } from "./manual-subform";
import { useState } from "react";

function ManualSubFormSet(props: { rate: number, onSubmit: (data: Inputs[]) => void, crypto: { cryptoAsset: string; amountOfCryptoAsset: string } }) {
    const [rateData, setRateData] = useState<Inputs[]>([])

    const handleSubmit = (id: number)=>(input: Inputs)=>{
        console.log(id, input, rateData)

        setRateData(prev => {
            prev[id] = input;
            return prev;
        })
        
        props.onSubmit(rateData);
    }


    return (
        <>
            <Typography sx={{mt: 10}}variant="h5">
                Wprowadź dane dla waluty {props.crypto.cryptoAsset}
            </Typography>
            <ManualSubForm rate={props.rate} onSubmit={handleSubmit(0)}></ManualSubForm>
            <ManualSubForm rate={props.rate} onSubmit={handleSubmit(1)}></ManualSubForm>
            <ManualSubForm rate={props.rate} onSubmit={handleSubmit(2)}></ManualSubForm>

        </>
    );
}

export default ManualSubFormSet;