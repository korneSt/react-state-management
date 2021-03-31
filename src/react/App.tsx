import React, { createContext, useState, useContext } from 'react';
import { IGeneral } from '../types';
import Layout from './components/Layout';



// create context to manage general state
const useDarkMode = (initial: IGeneral) => useState<IGeneral>(initial);
const GeneralContext = createContext<ReturnType<typeof useDarkMode> | null>(null);
export const useGeneralContext = () => useContext(GeneralContext)!;

const GeneralContextProvider: React.FC = (props) => {
  return (
    <GeneralContext.Provider value={useDarkMode({darkMode: false})}>
     {props.children}
    </GeneralContext.Provider>
  );
}

function App() {

  return (
    <GeneralContextProvider>
      <Layout />
    </GeneralContextProvider>
  );
}

export default App;
