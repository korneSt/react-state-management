import React, { ReducerState, useCallback, useContext, useReducer, useState } from 'react';
import { GlobalContext } from '../App';
import { initialState, moviesReducer } from '../common/hooks';
import { IMovie, IMovies } from '../common/interfaces';
import Header from './Header';
import Movies from './Movies';

export const fetchReducer = (state: {isLoading: boolean, error: string}, action: any) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: '',
      };
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default: throw new Error();
  }
}


export const movieReducer = (state: {movies: IMovie[], likes: Record<string, number>}, action: any) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload,
      };
    case 'LIKE':
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload]: state.likes[action.payload] + 1,
        },
      };
    case 'DISLIKE':
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload]: state.likes[action.payload] - 1,
        },
      }
    default: throw new Error();
  }
}


export const selectMostLiked = (likes: Record<string, number>) => {
  const top = Object.entries(likes).reduce((max, cur) => (cur[1] > max[1] ? max = cur : max), Object.entries(likes)[0]);
  return top ? top[0] : "-";
};

function Layout() {
  const [global] = useContext(GlobalContext as any);
  const [query, setQuery] = useState<string>('a');
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  const onQueryChange = (query: string) => {
    setQuery(q => query);
  };

  const mostLiked = selectMostLiked(state.likes);

  return (
    <div className={`${global.darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-700 bg-gray-50 flex flex-col h-screen">
        <Header onQueryChange={onQueryChange} mostLiked={mostLiked}/>
        <Movies query={query} moviesState={state} dispatch={dispatch}/>
      </div>  
    </div>
  );
}

export default Layout;
