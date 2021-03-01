import { RootState } from '..';
import * as CONS from './constants';
import { Movie } from './types';

const api = (endpoint: string) => (`http://api.tvmaze.com/${endpoint}`);

export function getMovies(query: string): (dispatch: any) => Promise<void> {
  return async (dispatch) => {
    dispatch(getMoviesStarted());
    try {

      const response = await fetch(api(`search/shows?q=${query || 'a'}`));
      const movies = await response.json() as Movie[];

      dispatch(getMoviesSuccess(movies));
    } catch (err) {
      dispatch(getMoviesError(err));
    }
  }
}

function getMoviesStarted() {
  return {
    type: CONS.GET_MOVIES_STARTED,
  } as const;
}

function getMoviesSuccess(movies: Movie[]) {
  return {
    type: CONS.GET_MOVIES_SUCCESS,
    movies,
  } as const;
}

function getMoviesError(error: string) {
  return {
    type: CONS.GET_MOVIES_ERROR,
    error,
  } as const;
}

export function like(movieName: string) {
  return {
    type: CONS.LIKE,
    movieName,
  } as const;
}

export function dislike(movieName: string) {
  return {
    type: CONS.DISLIKE,
    movieName,
  } as const;
}

export const selectMostLiked = (state: RootState) => {
  const likes = Object.entries(state.movies.likes);
  const top = likes.reduce((max, cur) => (cur[1] > max[1] ? max = cur : max), likes[0]);

  return top ? top[0] : "-";
};

export type MovieActions = ReturnType<
  | typeof getMoviesStarted | typeof getMoviesSuccess | typeof getMoviesError
  | typeof like | typeof dislike
>;
