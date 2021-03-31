import React from 'react';
import { useGeneralContext } from '../App';
import { selectMostLiked, useMoviesReducer } from '../common/hooks';
import Header from './Header';
import Movies from './Movies';

function Layout() {
  const [general] = useGeneralContext();
  const [state, dispatch] = useMoviesReducer();

  const mostLiked = selectMostLiked(state.likes);

  return (
    <div className={`${general.darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-700 bg-gray-50 flex flex-col h-screen">
        <Header mostLiked={mostLiked} dispatch={dispatch}/>
        <Movies moviesState={state} dispatch={dispatch}/>
      </div>  
    </div>
  );
}

export default Layout;
