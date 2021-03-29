import { IMovie, IMovies, MovieAction } from './interfaces';

export const initialState: IMovies = {
  movies: {
    data: [],
    isLoading: false,
    error: '',
  },
  likes: {},
  favourites: [],
};

export const moviesReducer = (state: IMovies, action: MovieAction): IMovies => {
  switch (action.type) {
    case 'SET_MOVIES_STARTED':
      return {
        ...state,
        movies: {
          data: [],
          isLoading: true,
          error: '',
        },
      };
    case 'SET_MOVIES_SUCCESS':
      return {
        ...state,
        movies: {
          isLoading: false,
          data: action.payload,
          error: '',
        },
      };
    case 'SET_MOVIES_ERROR':
      return {
        ...state,
        movies: {
          data: [],
          isLoading: false,
          error: action.payload,
        },
      };
    case 'LIKE':
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload]: (state.likes[action.payload] || 0) + 1,
        },
      };
    case 'DISLIKE':
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload]: (state.likes[action.payload] || 0) - 1,
        },
      }
    default:
     return state;
  }
}

