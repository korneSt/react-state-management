import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {selectDarkMode, setDarkMode } from '../store/globalSlice';
import { getMovies, selectMostLiked } from '../store/moviesSlice';

import './Header.css';

function Header() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const mostLiked = useSelector(selectMostLiked);

  return (
    <header className="bg-indigo-900 h-16 p-2 flex justify-between w-full">
      <div className="my-auto">
        <input onChange={(evt) => dispatch(getMovies(evt.target.value))}/>
      </div>
      <div className="my-auto text-white">
        <p>Most liked: {mostLiked}</p>
      </div>
      <div className="my-auto">
        <label 
          htmlFor="toogleA"
          className="flex items-center cursor-pointer"
        >
          <div className="relative" >
            <input id="toogleA" type="checkbox" className="hidden" />
            <div
              onClick={() => dispatch(setDarkMode())}
              className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
            <div
              onClick={() => dispatch(setDarkMode())}
              className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0" />
          </div>
          <div className="ml-3 text-gray-700 font-medium" />
        </label>
      </div>
    </header>
  );
}

export default Header;
