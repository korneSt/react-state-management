import React, { useEffect } from 'react';
import useMovieStore from '../store/movieStore';
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa';

import OneMovie from './Movie';


const Movies = ()=> {
  const getMovies = useMovieStore(state => state.getMovies);
  const movies = useMovieStore(state => state.movies);

  useEffect(() => {
    getMovies('dark');
  }, []);

  
  if (movies.isLoading) {
    return (
      <div className="h-full w-full flex justify-center">
        <p className="my-32 loader"></p>
      </div>
    );
  }

  if (movies.error) {
    return (
      <div className="h-full w-full">
        <div className="my-32 flex flex-col justify-center items-center text-gray-400">
          <FaRegTimesCircle className="text-6xl"/>
          <p className="text-2xl">Error</p>
        </div>
    </div>
    );
  }

  if (!movies.data.length) {
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
      {movies.data.map((el) => (
        <OneMovie key={el.show.id} movie={el} />
      ))}
    </div>
  );
}


export default Movies;