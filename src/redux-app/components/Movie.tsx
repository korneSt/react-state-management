import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import {
  like,
  dislike,
} from '../store/movies/actions';
import { Movie } from '../store/movies/types';
import logo512 from '../logo192.png';

interface Props {
  movie: Movie;
}

const OneMovie: React.FC<Props> = ({movie}) => {
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.movies.likes[movie!.show.name]);

  return (
    <div className="m-4 cursor-pointer dark:text-gray-50 dark:bg-gray-900 max-w-md mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <img className="h-52 w-40 " src={movie.show.image?.medium || logo512} alt="Image"/>
        </div>
        <div className="p-2">
          <div className="uppercase tracking-wide text-sm text-indigo-700 font-semibold">{movie.show.name}</div>
          <p className="block mt-1 text-lg leading-tight font-medium">{movie.show.rating.average}</p>
          <p className="mt-2 text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{__html: movie.show.summary ? movie.show.summary.substr(0, 80).concat('...') : ''}}></p>
        <button className="m-2" onClick={() => dispatch(like(movie.show.name))}>👍</button>
        <p> {likes} </p>
        <button onClick={() => dispatch(dislike(movie.show.name))}>👎</button>
        </div>
      </div>
    </div>
  );
}

export default OneMovie;