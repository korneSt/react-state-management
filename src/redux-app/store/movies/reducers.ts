import * as CONS from './constants';
import { MovieActions } from "./actions";
import { IMovies, initialMovieState } from "../../../types";


const moviesReducer = (state = initialMovieState, action: MovieActions): IMovies => {
  switch(action.type) {
    case CONS.GET_MOVIES_STARTED:
      return {
        ...state,
        movies: {
          ...state.movies,
          data: [],
          isLoading: true,
          error: '',
        },
      };
    case CONS.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: {
          ...state.movies,
          data: action.movies,
          isLoading: false,
          error: '',
        },
      };
    case CONS.GET_MOVIES_ERROR:
      return {
        ...state,
        movies: {
          ...state.movies,
          data: [],
          isLoading: false,
          error: action.error,
        },
      };
    case CONS.LIKE:
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.movieName]: (state.likes[action.movieName] || 0) + 1,
        },
      };
    case CONS.DISLIKE:
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.movieName]: (state.likes[action.movieName] || 0) - 1,
        },
      };
    default:
      return state;
  }
}

export default moviesReducer;