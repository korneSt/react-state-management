import React from 'react';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';

import Layout from './components/Layout';

import { store } from '../rtk-app/store/index';

function App() {

  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
