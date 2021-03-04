import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { observer } from 'mobx-react';
import { moviesStore } from '../store/movies';

// import logo from '../logo192.png';


const OneMovie = observer(({movie}: {movie: any}) => {

  return (
    <div className="m-4 cursor-pointer dark:text-gray-50 dark:bg-gray-900 max-w-md mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <img className="h-52 w-40 " src={movie.show.image?.medium} alt="Image"/>
        </div>
        <div className="p-2">
          <div className="uppercase tracking-wide text-sm text-indigo-700 font-semibold">{movie.show.name}</div>
          <p className="block mt-1 text-lg leading-tight font-medium">{movie.show.rating.average}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{__html: movie.show.summary ? movie.show.summary.substr(0, 80).concat('...') : ''}}></p>
        <button className="m-2" onClick={() => moviesStore.like(movie.show.name)}>👍</button>
        <p> {moviesStore.getmovieLikes(movie.show.name)} </p>
        <button onClick={() => moviesStore.dislike(movie.show.name)}>👎</button>
        </div>
      </div>
    </div>
  );
});

export default OneMovie;