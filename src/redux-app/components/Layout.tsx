import React from 'react';
import { useSelector } from 'react-redux';

import Movies from './Movies';
import Header from './Header';

import { RootState } from '../store';

function Layout() {
  const darkMode = useSelector((state: RootState) => state.global.darkMode);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-700 bg-gray-100">
        <Header />
        <Movies />
      </div>  
    </div>
  );
}

export default Layout;
