import create from "zustand";
import { devtools } from 'zustand/middleware';

export interface IMovie {
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


export interface ILoadingData {
  isLoading: boolean;
  error: string;
}

export type IMovies = {
  movies: {
    data: IMovie[];
  } & ILoadingData;
  likes: {
    [key: string]: number;
  };
  favourites: IMovie[];
}

export type IMoviesActions = {
  like: (name: string) => void;
  dislike: (name: string) => void;
  getMovies: (query: string) => void;
}

export type IMoviesStore = IMovies & IMoviesActions;

const api = (endpoint: string) => (`http://api.tvmaze.com/${endpoint}`);


const useMovieStore = create<IMoviesStore>(devtools((set, get) => ({
  movies: {
    data: [],
    isLoading: false,
    error: '',
  },
  likes: {},
  favourites: [],
  like: (name: string) => set(state => ({
    likes: {
      ...state.likes,
      [name]: (state.likes[name] || 0) + 1,
    }
  })),
  dislike: (name: string) => set(state => ({
    likes: {
      ...state.likes,
      [name]: (state.likes[name] || 0) - 1,
    }
  })),
  getMovies: async (query: string) => {
    set(state => ({
      movies: {
        ...state.movies,
        isLoading: true,
        error: '',
      }
    }));
    try {
      const response = await fetch(api(`search/shows?q=${query || 'a'}`));
      const result = await response.json();
      set(state => ({
        movies: {
          ...state.movies,
          isLoading: false,
          data: result,
          error: '',
        }
      }));
    } catch (err) {
      set(state => ({
        movies: {
          ...state.movies,
          isLoading: false,
          error: err,
        }
      }));
    }
  }
})));


export default useMovieStore;