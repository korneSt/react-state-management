import React, { useEffect } from 'react';
import { api } from '../../types';
import { IMovies, MovieAction } from '../common/interfaces';
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa';

import OneMovie from './Movie';

interface Props {
  query: string;
  moviesState: IMovies;
  dispatch: React.Dispatch<MovieAction>;
}

const fetchMovies = async (dispatch: React.Dispatch<MovieAction>, query: string) => {
  dispatch({type: 'SET_MOVIES_STARTED'});
  try {
    const response = await fetch(api(`search/shows?q=${query}`));
    const json = await response.json();
    dispatch({type: 'SET_MOVIES_SUCCESS', payload: json});
  } catch (err) {
    dispatch({type: 'SET_MOVIES_ERROR', payload: err});

  }
}

const Movies: React.FC<Props> = ({query, moviesState, dispatch})=> {

  useEffect(() => {
    // async function fetchMovies() {
    //   dispatch({type: 'SET_MOVIES_STARTED'});
    //   try {
    //     const response = await fetch(api(`search/shows?q=${query}`));
    //     const json = await response.json();
    //     dispatch({type: 'SET_MOVIES_SUCCESS', payload: json});
    //   } catch (err) {
    //     dispatch({type: 'SET_MOVIES_ERROR', payload: err});

    //   }
    // }
    fetchMovies(dispatch, query);
  }, [query, dispatch]);

  if (moviesState.movies.isLoading) {
    return (
      <div className="h-full w-full flex justify-center">
        <p className="my-32 loader"></p>
      </div>
    );
  }

  if (moviesState.movies.error) {
    return (
      <div className="h-full w-full">
        <div className="my-32 flex flex-col justify-center items-center text-gray-400">
          <FaRegTimesCircle className="text-6xl"/>
          <p className="text-2xl">Error</p>
        </div>
    </div>
    );
  }

  if (!moviesState.movies.data.length) {
    return (
      <div className="h-full w-full">
        <div className="my-32 flex flex-col justify-center items-center text-gray-400">
          <FaSearch className="text-6xl"/>
          <p className="text-2xl">Search shows</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      {moviesState.movies.data.map((el) => {
        const likes = moviesState.likes[el.show.name];
        return (
          <OneMovie
            key={el.show.id}
            movie={el}
            dispatch={dispatch}
            likes={likes}
          />
        )})
      }
    </div>
  );
}

export default Movies;