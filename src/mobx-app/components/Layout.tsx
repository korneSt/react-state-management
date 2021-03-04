import React from 'react';
import { observer } from 'mobx-react';

import Movies from './Movies';
import Header from './Header';

import { globalStore } from '../store/global';

const Layout = observer(() => {
  const darkMode = globalStore.darkMode;

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-700 bg-gray-100 h-screen">
        <Header globalState={globalStore} />
        <Movies />
      </div>  
    </div>
  );
})

export default Layout;
