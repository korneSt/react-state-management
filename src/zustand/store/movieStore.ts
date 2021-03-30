import create, { State } from "zustand";
import { devtools } from 'zustand/middleware';
import { api, IMovies } from "../../types";


export interface IMoviesStore extends IMovies, State {
  like: (name: string) => void;
  dislike: (name: string) => void;
  getMovies: (query: string) => void;
}


const useMovieStore = create<IMoviesStore>(devtools((set, get) => ({
  movies: {
    data: [],
    isLoading: false,
    error: '',
  },
  likes: {},
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
      const response = await fetch(api(`search/shows?q=${query}`));
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