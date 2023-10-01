import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    enforcementAuthority: '',
    caseNumber: '',
    cryptoCurrencyOwnerData: '',
    cryptoAssets: [{ cryptoAsset: '', amountOfCryptoAsset: '' }],
};
export const newReportSlice = createSlice({
    name: 'newReport',
    initialState,
    reducers: {
        changeFormState: (state, action) => {
            state.cryptoAssets = action.payload.cryptoAssets;
            state.enforcementAuthority = action.payload.enforcementAuthority;
            state.caseNumber = action.payload.caseNumber;
            state.cryptoCurrencyOwnerData = action.payload.cryptoCurrencyOwnerData;
        },
    },
});
export const { changeFormState } = newReportSlice.actions;
export default newReportSlice.reducer;
