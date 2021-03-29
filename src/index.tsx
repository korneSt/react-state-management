import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';

import App from './redux-app/App';
// import App from './zustand/App';
// import App from './rtk-app/App';
// import App from './mobx-app/App';
// import App from './react/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
