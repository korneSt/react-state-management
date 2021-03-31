import React, { useEffect } from 'react';
import { autorun } from "mobx";
import { observer } from 'mobx-react';
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa';

import OneMovie from './Movie';
import { moviesStore } from '../store/movies';

const Movies = () => {

  useEffect(() => {
    const disposer = autorun(() => moviesStore.getMovies('dark'));
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
      <div className="h-full w-full">
        <div className="my-32 flex flex-col justify-center items-center text-gray-400">
          <FaRegTimesCircle className="text-6xl"/>
          <p className="text-2xl">Error</p>
        </div>
    </div>
    );
  }

  if (!moviesStore.movies.data.length) {
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
      {moviesStore.movies.data.map((el) => (
        <OneMovie key={el.show.id} movie={el} />
      ))}
    </div>
  );
};


export default observer(Movies);