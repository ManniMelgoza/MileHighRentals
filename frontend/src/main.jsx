import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Redux Provider which makes the Redux store available to the component tree.
import { Provider } from 'react-redux';
// configureStore will create the Redux store
import configureStore from './store';

import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { Modal, ModalProvider } from './context/Modal';

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);
