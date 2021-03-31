import React from 'react';
import { observer } from 'mobx-react';

import Movies from './Movies';
import Header from './Header';

import { generalStore } from '../store/general';

const Layout = () => {
  const darkMode = generalStore.darkMode;

  return (
    <div className={`App ${darkMode ? "dark" : ""} `}>
      <div className="dark:bg-gray-700 bg-gray-50 flex flex-col h-screen">
        <Header generalState={generalStore} />
        <Movies />
      </div>  
    </div>
  );
}

export default observer(Layout);
