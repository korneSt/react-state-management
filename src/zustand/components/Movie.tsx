import React from 'react';
import { FaThumbsUp, FaThumbsDown, FaChartLine } from 'react-icons/fa'; 
import shallow from 'zustand/shallow';

import { IMovie } from '../../types';
import useMovieStore, { IMoviesStore } from '../store/movieStore';

interface Props {
  movie: IMovie;
}

const setLikesSelector = (state: IMoviesStore) => ({
  like: state.like,
  dislike: state.dislike,
});


const OneMovie: React.FC<Props> = ({movie}) => {

  const { like, dislike } = useMovieStore(setLikesSelector, shallow);
  const likes = useMovieStore(state => state.likes[movie.show.name]);

  const onLike = () => {
    like(movie.show.name);
  }

  const onDislike = () => {
    dislike(movie.show.name);
  }

  return (
    <div className="m-4 cursor-pointer dark:text-gray-50 dark:bg-gray-800 max-w-md mx-auto bg-gray-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <img className="h-52 w-40 text-center" src={movie.show.image?.medium} alt="Image"/>
        </div>
        <div className="p-2">
          <div className="uppercase tracking-wide text-lg text-indigo-700 font-semibold">{movie.show.name}</div>
          <div className="flex items-center mt-1 text-lg">
            <FaChartLine className="mr-1" /> 
            <p className="font-medium"> {movie.show.rating.average || "N/A"} </p>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{__html: movie.show.summary ? movie.show.summary.substr(0, 80).concat('...') : ''}}></p>
        <div className="flex items-center my-2 text-lg">
          <FaThumbsUp className="mr-2 text-green-700" onClick={onLike}/>
          <p> {likes || 0} </p>
          <FaThumbsDown className="ml-2 text-red-700" onClick={onDislike}/>
        </div>
        </div>
      </div>
    </div>
  );
}

export default OneMovie;