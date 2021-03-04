import React from 'react';
import { observer } from 'mobx-react';

import { moviesStore } from '../store/movies';

import './Header.css';

const Header = observer(({globalState}: {globalState: any}) => {

  return (
    <header className="bg-indigo-900 h-16 p-2 flex justify-between w-full">
      <div className="my-auto">
        <input onChange={(evt) => moviesStore.getMovies(evt.target.value)}/>
      </div>
      <div className="my-auto text-white">
        <p>Most liked: {moviesStore.mostLiked}</p>
      </div>
      <div className="my-auto">
        <label 
          htmlFor="toogleA"
          className="flex items-center cursor-pointer"
        >
          <div className="relative" >
            <input id="toogleA" type="checkbox" className="hidden" />
            <div
              onClick={() => globalState.setDarkMode()}
              className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
            <div
              onClick={() => globalState.setDarkMode()}
              className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0" />
          </div>
          <div className="ml-3 text-gray-700 font-medium" />
        </label>
      </div>
    </header>
  );
})

export default Header;
