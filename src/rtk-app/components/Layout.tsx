import React from 'react';

import Movies from './Movies';
import Header from './Header';

import { selectDarkMode } from '../store/generalSlice';
import { useAppSelector } from '../store/hooks';

function Layout() {
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-700 bg-gray-50 flex flex-col h-screen">
        <Header />
        <Movies />
      </div>  
    </div>
  );
}

export default Layout;
