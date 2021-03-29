import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSun, FaMoon } from 'react-icons/fa'; 
import { debounce } from 'ts-debounce';

import { RootState } from '../store';
import { setDarkMode } from '../store/global/actions';
import { getMovies, selectMostLiked } from '../store/movies/actions';


function Header() {
  const dispatch = useDispatch();
  
  const mostLiked = useSelector(selectMostLiked);
  const darkMode = useSelector((state: RootState) => state.global.darkMode);
  
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
