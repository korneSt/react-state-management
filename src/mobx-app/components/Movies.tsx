import React, { useEffect } from 'react';
import { autorun } from "mobx";
import { observer } from 'mobx-react';


import OneMovie from './Movie';
import { moviesStore } from '../store/movies';

const Movies = observer( () => {

  useEffect(() => {
    // moviesStore.getMovies('');
    const disposer = autorun(() => moviesStore.getMovies(''));

    return () => {
      disposer();
    };
  }, [])

  if (moviesStore.movies.isLoading) {
    return (
      <div className="text-4xl flex justify-center align-middle h-full">
        <p className="">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {moviesStore.movies.data.map((el) => (
        <OneMovie key={el.show.id} movie={el} />
      ))}
    </div>
  );
});


export default Movies;