import { csrfFetch } from "./csrf";

// create actions
const GET_ALL_SPOTS = "spots/getAllSpots";
// const GET_CURRENT_SPOT = "spots/getCurrentSpot";
// const CREATE_NEW_SPOT = "spots/createNewSpot";
// const EDIT_SPOT = "spots/editSpot";
// const DELETE_SPOT = " spots/deleteSpot"


// ACTION CREATORS

const getAllSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    };
};

// THUNK

export const retriveAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("api/spots");
    const data = await response.json();
    dispatch(getAllSpotsAction(data.spots));
    return response;
};

// ACTION CREATORS
const initialState = { spots: null};

// REUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:

        return { ...state, user: action.payload};

    default:
        return state;
    }
};

export default spotsReducer;
