import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface NewReportState {
  enforcementAuthority: string;
  caseNumber: string;
  cryptoCurrencyOwnerData: string;
  cryptoAssets: { cryptoAsset: string; amountOfCryptoAsset: string }[];
}

const initialState: NewReportState = {
  enforcementAuthority: '',
  caseNumber: '',
  cryptoCurrencyOwnerData: '',
  cryptoAssets: [{ cryptoAsset: '', amountOfCryptoAsset: '' }],
};

export const newReportSlice = createSlice({
  name: 'newReport',
  initialState,
  reducers: {
    changeFormState: (state, action: PayloadAction<NewReportState>) => {
      state.cryptoAssets = action.payload.cryptoAssets;
      state.enforcementAuthority = action.payload.enforcementAuthority;
      state.caseNumber = action.payload.caseNumber;
      state.cryptoCurrencyOwnerData = action.payload.cryptoCurrencyOwnerData;
    },
  },
});

export const { changeFormState } = newReportSlice.actions;

export default newReportSlice.reducer;
