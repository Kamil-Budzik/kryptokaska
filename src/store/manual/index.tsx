import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ManualState {
  url: string;
  stockMarketName: string;
  currency: string;
  amount: number;
  plnAmount?: number;
}

export interface ManualStateObject {
  states: ManualState[][];
}
const initialState: ManualStateObject = { 
  states: [] 
}

export const manualSlice = createSlice({
  name: 'manual',
  initialState,
  reducers: {
    changeFormState: (state, action: PayloadAction<ManualStateObject>) => {
      state.states = action.payload.states;
    },
  },
});

export const { changeFormState } = manualSlice.actions;

export default manualSlice.reducer;
