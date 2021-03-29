import React from 'react';

import Movies from './Movies';
import Header from './Header';
import useGlobalStore from '../store/globalStore';


function Layout() {
  const darkMode = useGlobalStore(state => state.darkMode);

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
