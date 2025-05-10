// Import React to use JSX and build components
import React from 'react';
// Import ReactDOM to render React components into the DOM
import ReactDOM from 'react-dom/client';
// Import the main App component which defines the root of the component tree
import App from './App';
// Import the global CSS styles for the application
import './index.css';
// Import Provider from react-redux to give access to the Redux store to the entire component tree
import { Provider } from 'react-redux';
// Import configureStore function which creates and configures the Redux store with middleware and reducers
import configureStore from './store';
// Import restoreCSRF and csrfFetch utility functions for CSRF protection and safe API calls
import { restoreCSRF, csrfFetch } from './store/csrf';
// Import all session-related Redux actions (like login, logout, restoreUser) as an object
import * as sessionActions from './store/session';
// Import Modal and ModalProvider from custom context to manage modal state across the app
import { Modal, ModalProvider } from './context/Modal';


// Create the Redux store instance by calling configureStore
const store = configureStore();

// If the app is running in development mode (not production)
if (import.meta.env.MODE !== 'production') {
  // Call function to set CSRF token cookie for safe API use during development
  restoreCSRF();

  // Attach csrfFetch function to the global window object for manual testing in dev tools
  window.csrfFetch = csrfFetch;
  // Attach the Redux store to the window object for debugging in the browser
  window.store = store;
  // Attach session-related actions to the window for easy manual dispatch in dev tools
  window.sessionActions = sessionActions;
}

// Find the HTML element with id 'root' and create a React root for rendering
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode is a React tool to help identify potential problems by activating additional checks
  <React.StrictMode>
    {/* ModalProvider wraps the app and provides modal state/context to all components */}
    <ModalProvider>
      {/* Provider makes the Redux store available to any nested components that call useSelector or useDispatch */}
      <Provider store={store}>
        {/* App is the root component of the application that contains all routes and pages */}
        <App />

        {/* Modal renders the actual modal component which can be triggered from anywhere in the app */}
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);
