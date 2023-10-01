import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ManualState {
  url: string;
  stockMarketName: string;
  currency: string;
  amount: number;
}

const initialState: ManualState = {
  url: '',
  stockMarketName: '',
  amount: 0,
  currency: 'PLN',
};

export const manualSlice = createSlice({
  name: 'manual',
  initialState,
  reducers: {
    changeFormState: (state, action: PayloadAction<ManualState>) => {
      state.url = action.payload.url;
      state.currency = action.payload.currency;
      state.stockMarketName = action.payload.stockMarketName;
    },
  },
});

export const { changeFormState } = manualSlice.actions;

export default manualSlice.reducer;
