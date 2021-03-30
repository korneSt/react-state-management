import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; 
import { debounce } from 'ts-debounce';
import { useGlobalContext } from '../App';
import { fetchMovies, selectMostLiked, useMoviesReducer } from '../common/hooks';
import { MovieAction } from '../common/interfaces';

interface Props {
  mostLiked: string;
  dispatch: React.Dispatch<MovieAction>;
}

const Header: React.FC<Props> = (props) => {

  const [global, setGlobal] = useGlobalContext();

  const mostLiked = props.mostLiked;
  const darkMode = global.darkMode;

  const debounceSearch = debounce((query: string) => {
    fetchMovies(props.dispatch, query);
  }, 300);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  }

  const onThemeChange = () => {
    setGlobal({darkMode: !global.darkMode});
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

export default React.memo(Header);
