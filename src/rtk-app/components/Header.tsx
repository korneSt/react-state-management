import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; 

import { setDarkMode } from '../store/generalSlice';
import { getMovies, selectMostLiked } from '../store/moviesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { debounce } from 'ts-debounce';


function Header() {
  const dispatch = useAppDispatch();
  
  const mostLiked = useAppSelector(selectMostLiked);
  const darkMode = useAppSelector(state => state.general.darkMode);

  const debounceSearch = debounce((query: string) => {
    dispatch(getMovies(query));
  }, 300);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  }

  const onThemeChange = () => {
    dispatch(setDarkMode());
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
