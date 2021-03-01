import React from 'react';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';

import Layout from './components/Layout';

import { store } from '../rtk-app/store/index';
import { selectDarkMode } from '../rtk-app/store/globalSlice';

import './App.css';

function App() {

  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
