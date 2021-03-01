import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

interface Global {
  darkMode: boolean;
}

const initialState: Global = {
  darkMode: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setDarkMode: state => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { setDarkMode } = globalSlice.actions;

export const selectDarkMode = (state: RootState) => state.global.darkMode;

export default globalSlice.reducer;
