// Import functions from Redux to create a store, apply middleware, compose enhancers, and combine reducers
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

// Import redux-thunk middleware to allow for async actions in Redux
import thunk from 'redux-thunk';

// Import the session reducer to manage session-related state in the Redux store
import sessionReducer from './session';

// Combine all reducers into a single root reducer object
// The key `session` in the state will be managed by `sessionReducer`
const rootReducer = combineReducers({
  // ADD REDUCERS HERE
  session: sessionReducer
});

// Declare a variable `enhancer` to hold the middleware/enhancer configuration for the store
let enhancer;

// Check if the app is running in production mode
if (import.meta.env.MODE === "production") {
  // If in production, apply only thunk middleware (no logger or devtools)
  enhancer = applyMiddleware(thunk);
} else {
  // If in development, dynamically import redux-logger middleware
  const logger = (await import("redux-logger")).default;

  // Use Redux DevTools extension if available, otherwise fall back to Redux's compose function
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Apply thunk and logger middleware using composeEnhancers
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// Define a function that creates and configures the Redux store
// It accepts optional preloaded state as the initial state
const configureStore = (preloadedState) => {
  // Create the store with the root reducer, preloaded state, and enhancer
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
