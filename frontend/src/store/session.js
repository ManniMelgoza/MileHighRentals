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
    return data;
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
    if (response.ok){
      const data = await response.json();
      dispatch(setUser(data.user));
      return response;
    }
     else {
        const error = await response.json();
        return { error: error.errors || ['No able to signup user']}
     }
}


// LOGOUT THUNK USING DELETE API CALL

export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: 'DELETE'
    });
    if ( response.ok){

      dispatch(removeUser())
      return response;
    } else{
         const error = await response.json();
        return { error: error.errors || ['User was not logout']}
    }
}

export default sessionReducer;
