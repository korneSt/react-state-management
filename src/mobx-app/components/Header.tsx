import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; 

import { observer } from 'mobx-react';

import { moviesStore } from '../store/movies';
import { generalStore } from '../store/general';
import { debounce } from 'ts-debounce';

interface Props {
  generalState: typeof generalStore;
}

const Header: React.FC<Props> = ({generalState}) => {
  const mostLiked = moviesStore.mostLiked;
  const darkMode = generalState.darkMode;

  const debounceSearch = debounce((query: string) => {
    moviesStore.getMovies(query);
  }, 300);
  
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  }

  const onThemeChange = () => {
    generalState.setDarkMode();
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
