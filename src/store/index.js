import { configureStore } from '@reduxjs/toolkit';
import newReportReducer from './new-report';
import manualReducer from './manual';
export const store = configureStore({
    reducer: {
        newReport: newReportReducer,
        manual: manualReducer,
    },
});
