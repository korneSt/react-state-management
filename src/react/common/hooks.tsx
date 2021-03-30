import { MovieAction } from './interfaces';
import { useReducer, useState } from 'react';
import { api, IGlobal, IMovies, initialMovieState } from '../../types';


// custom hooks
export const useMoviesReducer = () => useReducer(moviesReducer, initialMovieState);

// movies reducer
const moviesReducer = (state: IMovies, action: MovieAction): IMovies => {
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

// utility function
export const fetchMovies = async (dispatch: React.Dispatch<MovieAction>, query: string) => {
  dispatch({type: 'SET_MOVIES_STARTED'});
  try {
    const response = await fetch(api(`search/shows?q=${query}`));
    const json = await response.json();
    dispatch({type: 'SET_MOVIES_SUCCESS', payload: json});
  } catch (err) {
    dispatch({type: 'SET_MOVIES_ERROR', payload: err});
  }
}

// selector
export const selectMostLiked = (likes: Record<string, number>) => {
  const top = Object.entries(likes).reduce((max, cur) => (cur[1] > max[1] ? max = cur : max), Object.entries(likes)[0]);
  return top ? top[0] : "-";
};

