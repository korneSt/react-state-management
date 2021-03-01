import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer  from './moviesSlice';
import globalReducer  from './globalSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
