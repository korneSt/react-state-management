import React, { createContext, useState, useContext } from 'react';
import { IGlobal } from '../types';
import Layout from './components/Layout';



// create context to manage global state
const useDarkMode = (initial: IGlobal) => useState<IGlobal>(initial);
const GlobalContext = createContext<ReturnType<typeof useDarkMode> | null>(null);
export const useGlobalContext = () => useContext(GlobalContext)!;

const GlobalContextProvider: React.FC = (props) => {
  return (
    <GlobalContext.Provider value={useDarkMode({darkMode: false})}>
     {props.children}
    </GlobalContext.Provider>
  );
}

function App() {

  return (
    <GlobalContextProvider>
      <Layout />
    </GlobalContextProvider>
  );
}

export default App;
