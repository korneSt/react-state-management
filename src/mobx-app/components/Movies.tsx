import React, { useEffect } from 'react';
import { autorun } from "mobx";
import { observer } from 'mobx-react';


import OneMovie from './Movie';
import { moviesStore } from '../store/movies';

const Movies = () => {

  useEffect(() => {
    // moviesStore.getMovies('');
    const disposer = autorun(() => moviesStore.getMovies(''));

    return () => {
      disposer();
    };
  }, [])

  if (moviesStore.movies.isLoading) {
    return (
      <div className="h-full w-full flex justify-center">
        <p className="my-32 loader"></p>
      </div>
    );
  }

  if (moviesStore.movies.error) {
    return (
      <div className="h-full w-full flex justify-center">
        <p className="my-32">Error Loading Data :(</p>
      </div>
    );
  }
 
  return (
    <div className="overflow-y-auto h-full">
      {moviesStore.movies.data.map((el) => (
        <OneMovie key={el.show.id} movie={el} />
      ))}
    </div>
  );
};


export default observer(Movies);