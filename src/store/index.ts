import { configureStore } from '@reduxjs/toolkit';
import newReportReducer from './new-report';
import manualReducer from './manual';
import cryptoReducer from './crypto';

export const store = configureStore({
  reducer: {
    newReport: newReportReducer,
    manual: manualReducer,
    crypto: cryptoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
