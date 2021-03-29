import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { api, initialMovieState } from '../../types';
import { RootState } from './index';



export const getMovies = createAsyncThunk(
  'getMovies', // action type -> create constants for us (getMovies/pending, getMovies/fulfilled, getMovies/rejected)
  async (query: string) => {
    const response = await fetch(api(`search/shows?q=${query || 'a'}`));
    return (await response.json());
  }
)

const changeCount = (prevCount: number, change: number) => {
  return prevCount + change;
}

// creating slice of the state
export const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialMovieState,
  reducers: {
    like: (state, action: PayloadAction<string>) => {
      state.likes[action.payload] = changeCount(state.likes[action.payload] || 0, 1);
    },
    dislike: (state, action: PayloadAction<string>) => {
      state.likes[action.payload] = changeCount(state.likes[action.payload] || 0, -1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.movies.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies.isLoading = false;
        state.movies.data = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.movies.isLoading = false;
        state.movies.error = action.error.message || 'Error';
      })
  },
});

export const { like, dislike } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMostLiked = (state: RootState) => {
  const likes = Object.entries(state.movies.likes); //returns [[key, val], [key, val]]
  const top = likes.reduce((max, cur) => (cur[1] > max[1] ? max = cur : max), likes[0]);
  return top ? top[0] : "-";
};

export default moviesSlice.reducer;
