import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './app/components/App';
import * as serviceWorker from './app/config/serviceWorker';
import Firebase, { FirebaseContext } from './app/components/Firebase';
import { store } from './app/@core/store';

// @ts-ignore
ReactDOM.render(<Provider store={store}><React.StrictMode><FirebaseContext.Provider value={new Firebase()}><App /></FirebaseContext.Provider></React.StrictMode></Provider>,
  document.getElementById('root')
);

serviceWorker.register();
