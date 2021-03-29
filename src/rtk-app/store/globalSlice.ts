import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { initialGlobalState } from '../../types';


// creating slice of the state
export const globalSlice = createSlice({
  name: 'global',
  initialState: initialGlobalState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// exporting selector for darkMode variable
export const selectDarkMode = (state: RootState) => state.global.darkMode;

// exporting action to setDarkMode
export const { setDarkMode } = globalSlice.actions;

// exportign reducer to combine it later with other reducers
export default globalSlice.reducer;
