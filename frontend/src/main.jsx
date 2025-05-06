import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store';
// Token auth by pass imports
import { restoreCSRF, csrfFetch } from './store/csrf';

// Sessions imports
import * as sessionActions from "./store/session";

// create a store
const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

if (import.meta.env.MODE !== 'production') {

  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  // Sessions
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider is what helps inject redux in react */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
