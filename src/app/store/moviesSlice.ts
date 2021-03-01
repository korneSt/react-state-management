import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from './index';

export interface Movie {
  score: number;
  show: {
    id: string;
    name: string;
    status: string;
    rating: {
      average: number;
    };
    image: {
      medium: string;
      original: string;
    };
    summary: string;
  };
}

export interface LoadingData {
  isLoading: boolean;
  error: string;
}

export interface Movies {
  movies: {
    data: Movie[];
  } & LoadingData;
  likes: {
    [key: string]: number;
  };
  favourites: Movie[];
}

const initialState: Movies = {
  movies: {
    data: [],
    isLoading: false,
    error: '',
  },
  likes: {},
  favourites: [],
};

const api = (endpoint: string) => (`http://api.tvmaze.com/${endpoint}`);

export const getMovies = createAsyncThunk(
  'getMovies', // action type -> create constants for us (getMovies/pending, getMovies/fulfilled, getMovies/rejected)
  async (query: string) => {
    const response = await fetch(api(`search/shows?q=${query || 'a'}`));
    return (await response.json());
  }
)
const getMovieDetails = createAsyncThunk(
  'getMovie', 
  async (id: string) => {
    const response = await (await fetch(id)).json();
    return response;
  }
)

const changeCount = (prevCount: number, change: number) => {
  return prevCount + change;
}


export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    like: (state, action: PayloadAction<string>) => {
      state.likes[action.payload] = changeCount(state.likes[action.payload] || 0, 1);
    },
    dislike: (state, action: PayloadAction<string>) => {
      state.likes[action.payload] = changeCount(state.likes[action.payload] || 0, -1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.movies.isLoading = true;
    })
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies.isLoading = false;
      state.movies.data = action.payload;

    })
    builder.addCase(getMovies.rejected, (state, action) => {
      state.movies.isLoading = false;
      state.movies.error = action.error.message || 'Error';
    })
  }
});

export const { like, dislike } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;
export const selectMostLiked = (state: RootState) => {
  const top = Object.entries(state.movies.likes).reduce((max, cur) => (cur[1] > max[1] ? max = cur : max), Object.entries(state.movies.likes)[0]);
  return top ? top[0] : "-";
};


export default moviesSlice.reducer;
