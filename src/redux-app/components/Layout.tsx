import React from 'react';
import { useSelector } from 'react-redux';

import Movies from './Movies';
import Header from './Header';

import { RootState } from '../store';

function Layout() {
  const darkMode = useSelector((state: RootState) => state.general.darkMode);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-700 bg-gray-50 flex flex-col h-screen">
        <Header />
        <Movies />
      </div>  
    </div>
  );
}

export default Layout;
