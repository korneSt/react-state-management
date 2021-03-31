import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';
import { initialGeneralState } from '../../types';


// creating slice of the state
export const generalSlice = createSlice({
  name: 'general',
  initialState: initialGeneralState,
  reducers: {
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

// exporting selector for darkMode variable
export const selectDarkMode = (state: RootState) => state.general.darkMode;

// exporting action creators
export const { setDarkMode } = generalSlice.actions;

// exportign reducer to combine it later with other reducers
export default generalSlice.reducer;
