import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; 

import { observer } from 'mobx-react';

import { moviesStore } from '../store/movies';
import { globalStore } from '../store/global';

interface Props {
  globalState: typeof globalStore;
}

const Header: React.FC<Props> = ({globalState}) => {
  const mostLiked = moviesStore.mostLiked;
  const darkMode = globalState.darkMode;

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    moviesStore.getMovies(e.target.value);
  }

  const onThemeChange = () => {
    globalState.setDarkMode();
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
};

export default observer(Header);
