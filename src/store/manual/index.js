import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    states: []
};
export const manualSlice = createSlice({
    name: 'manual',
    initialState,
    reducers: {
        changeFormState: (state, action) => {
            state.states = action.payload.states;
        },
    },
});
export const { changeFormState } = manualSlice.actions;
export default manualSlice.reducer;
