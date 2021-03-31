import { configureStore } from '@reduxjs/toolkit';
import moviesReducer  from './moviesSlice';
import generalReducer  from './generalSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    general: generalReducer,
  },
});

// exporint type for the whole state
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;