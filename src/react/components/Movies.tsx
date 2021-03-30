import React, { useEffect } from 'react';
import { IMovies } from '../../types';
import { MovieAction } from '../common/interfaces';
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa';

import OneMovie from './Movie';
import { fetchMovies } from '../common/hooks';

interface Props {
  moviesState: IMovies;
  dispatch: React.Dispatch<MovieAction>;
}


const Movies: React.FC<Props> = ({moviesState, dispatch})=> {

  useEffect(() => {
    fetchMovies(dispatch, 'dark');
  }, []);

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