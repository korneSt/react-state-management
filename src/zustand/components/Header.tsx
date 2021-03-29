import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; 

import useGlobalStore from '../store/globalStore';
import useMovieStore, { IMoviesStore } from '../store/movieStore';

import './Header.css';

const mostLikedSelector = (state: IMoviesStore) => {
  const top = Object.entries(state.likes).reduce((max, cur) => (cur[1] > max[1] ? max = cur : max), Object.entries(state.likes)[0]);
  return top ? top[0] : "-";
};

function Header() {
  const getMovies = useMovieStore(state => state.getMovies);
  const setDarkMode = useGlobalStore(state => state.setDarkMode);

  const mostLiked = useMovieStore(mostLikedSelector);
  const darkMode = useGlobalStore(state => state.darkMode);


  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    getMovies(e.target.value);
  }

  const onThemeChange = () => {
    setDarkMode();
  }
  return (
    <header className="bg-indigo-900 h-16 p-2 flex justify-between w-full">
      <div className="my-auto">
        <input className="rounded-sm p-0.5" placeholder="Search..." onChange={onSearch}/>
      </div>
      <div className="my-auto text-white">
        <p>Most liked: {mostLiked}</p>
      </div>
      <div className="my-auto text-white cursor-pointer text-xl" onClick={onThemeChange}>
        { darkMode ? <FaMoon /> : <FaSun /> }
      </div>
    </header>
  );
}

export default Header;
