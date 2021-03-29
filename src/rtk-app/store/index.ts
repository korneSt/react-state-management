import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer  from './moviesSlice';
import globalReducer  from './globalSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    global: globalReducer,
  },
});

// exporint type for the whole state
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
