import React, { useEffect } from 'react';
import useMovieStore from '../store/movieStore';

import OneMovie from './Movie';


const Movies = ()=> {
  const getMovies = useMovieStore(state => state.getMovies);
  const movies = useMovieStore(state => state.movies);

  useEffect(() => {
    getMovies('');
  }, []);

  if (movies.isLoading) {
    return (
      <div className="h-full w-full flex justify-center">
        <p className="my-32 loader"></p>
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