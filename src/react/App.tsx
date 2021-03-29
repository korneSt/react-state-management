import React, { createContext, useState, useContext } from 'react';
import Layout from './components/Layout';

import { Global } from './common/interfaces';
import './App.css';


// custom hooks
export const useGlobalContext = () => useContext(GlobalContext)!;
const useDarkMode = (initial: Global) => useState<Global>(initial);


// create context to manage global state
export const GlobalContext = createContext<ReturnType<typeof useDarkMode> | null>(null);

function App() {

  return (
    <GlobalContext.Provider value={useDarkMode({darkMode: false})}>
      <Layout />
    </GlobalContext.Provider>
  );
}

export default App;
