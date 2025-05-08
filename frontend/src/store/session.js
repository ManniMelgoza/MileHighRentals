/*
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { csrfFetch } from './csrf';
// import { combineReducers } from 'redux';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    // action
    type: REMOVE_USER,
    };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
        // the spread operator will retunr a new obj with the new state
        // NEVER return the old state/ same obj
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

// restoreUser thunk action
export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };


//SIGN UP thunk action

export const signup = (user) => async (dispatch) => {
    // This will destructure the users info
    const { username, firstName, lastName, email, password } = user;

    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username, firstName, lastName, email, password
        })
    });
    const data = await  response.json();
    dispatch(setUser(data.user));
    return response;
}


// LOGOUT THUNK USING DELETE API CALL

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: 'DELETE'
    });
    dispatch(removeUser())
    return response;
}


export default sessionReducer;
*/


// import { createAsyncThunk } from '@reduxjs/toolkit';
// This line is commented out — it would allow the use of Redux Toolkit's async thunk creator if needed.

// Import the csrfFetch utility function to make API requests with CSRF token handling
import { csrfFetch } from './csrf';

// import { combineReducers } from 'redux';
// This is commented out — would allow combining multiple reducers into one root reducer if needed.


// Define string constants to avoid typos in action types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";


// Action creator for setting the current user in state
const setUser = (user) => {
  return {
    type: SET_USER, // action type identifier
    payload: user   // user data returned from the server
  };
};


// Action creator for removing the current user from state (i.e., logout)
const removeUser = () => {
  return {
    // action
    type: REMOVE_USER, // action type to trigger user removal from state
    };
};


// Thunk action creator to log in a user
export const login = (user) => async (dispatch) => {
  // Destructure credential and password from the user object
  const { credential, password } = user;

  // Send a POST request to log in the user using csrfFetch
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });

  // Parse the JSON response to get user data
  const data = await response.json();

  // Dispatch the setUser action to update the store with the logged-in user
  dispatch(setUser(data.user));

  // Return the full response for possible chaining
  return response;
};


// Define the initial state of the session slice
const initialState = { user: null };


// Reducer function to handle session-related actions
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
        // The spread operator returns a new state object with the updated user
        // NEVER mutate or return the existing state directly
      return { ...state, user: action.payload };

    case REMOVE_USER:
      // Set the user back to null upon logout
      return { ...state, user: null };

    default:
      // Return the current state if the action type is unrecognized
      return state;
  }
};


// Thunk action to restore a user's session if they have a valid cookie/token
export const restoreUser = () => async (dispatch) => {
    // Make a GET request to the session endpoint
    const response = await csrfFetch("/api/session");

    // Parse the response to get user data
    const data = await response.json();

    // Dispatch setUser to update the store with the restored user
    dispatch(setUser(data.user));

    // Return the response in case further handling is needed
    return response;
  };


// SIGN UP thunk action for creating a new user account
export const signup = (user) => async (dispatch) => {
    // Destructure user details from the user object
    const { username, firstName, lastName, email, password } = user;

    // Make a POST request to register the user
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username, firstName, lastName, email, password
        })
    });

    // Parse the JSON response to get the new user data
    const data = await  response.json();

    // Dispatch setUser to log in the newly registered user
    dispatch(setUser(data.user));

    // Return the response
    return response;
}


// LOGOUT THUNK using DELETE API call to end user session
export const logout = () => async (dispatch) => {
    // Send DELETE request to remove session on the server
    const response = await csrfFetch("/api/session", {
        method: 'DELETE'
    });

    // Dispatch removeUser to clear user data from Redux store
    dispatch(removeUser());

    // Return the response
    return response;
}


// Export the sessionReducer as the default export of this module
export default sessionReducer;
