import React from 'react';
import { useSelector } from 'react-redux';

import Movies from './Movies';
import Header from './Header';

import { selectDarkMode } from '../store/globalSlice';

function Layout() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-700 bg-gray-100">
        <Header />
        <Movies />
      </div>  
    </div>
  );
}

export default Layout;
