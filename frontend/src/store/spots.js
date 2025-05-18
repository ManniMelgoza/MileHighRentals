import { csrfFetch } from "./csrf";

// create actions
const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_CURRENT_SPOT = "spots/getCurrentSpot";
const CREATE_NEW_SPOT = "spots/createNewSpot";
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOT = "spots/deleteSpot"


// ACTION CREATORS

const getAllSpotsAction = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    };
};

const getCurrentSpotAction = (spot) => {
    return {
        type: GET_CURRENT_SPOT,
        payload: spot
    };
};

const createNewSpotAction = (spots) => {
    return {
        type: CREATE_NEW_SPOT,
        payload: spots
    };
};


const editSpotAction = (spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot
    };
};

const deleteSpotAction = (spotId) => {
    return {
        type: DELETE_SPOT,
        payload: spotId,
    };
};

// THUNK PER ACTION
// const GET_ALL_SPOTS = "spots/getAllSpots"; ACTION

export const thunkRetriveAllSpots = () => async (dispatch) => {
    // Getting data from DB
    const response = await csrfFetch("/api/spots");
    // Making data readable
    if(response.ok){

        const data = await response.json();
        dispatch(getAllSpotsAction(data.Spots));
        return data;
    } else {
        const error = await response.json();
        return { error: error.errors || ['No Data Retrieved of all spots']}
    }
    // console.log('DATA from backend fetch at THUNK', data.Spots)
    // dispatch the data from DB to the Action
};

// const GET_CURRENT_SPOT = "spots/getCurrentSpot"; ACTION

export const thunkCurrentSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok){
        const data = await response.json();
        console.log('SPOT THUNK DATA', data)
        dispatch(getCurrentSpotAction(data.Spots));
        return data;
    } else {
        const error = await response.json();
        return { error: error.errors || ['No Data Retrieved of current spot']}
    }
};

// const CREATE_NEW_SPOT = "spots/createNewSpot"; ACTION
export const thunkCreateNewSpot = (spots) => async (dispatch) => {
    const { address, city, state, country, name, description, price } = spots;

    const response = await csrfFetch("/spots", {
        method: "POST",
         headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            address, city, state, country, name, description, price
        })
    });
    if(response.ok){

        const data = await response.json();
        dispatch(createNewSpotAction(data.Spots));
        return data;
    } else {
        const error = await response.json();
        return { error: error.errors || ['Not able to create a new spot']}
        // throw errors;
    }
};

// const EDIT_SPOT = "spots/editSpot"; ACTION
export const thunkEditSpot = (spotId, updateSpot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify(updateSpot)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editSpotAction(data))
        return data;
    } else {
        const error = await response.json();
        return { error: error.errors || ['Unable to Edit Spot']}
         // throw errors;
    }
};

// const DELETE_SPOT = " spots/deleteSpot" ACTION
export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok){
        dispatch(deleteSpotAction(spotId))
        return response;
    } else {
        const error = await response.json();
        return { error: error.errors || ['Spot Not DELETED']}
    }
}

// ACTION CREATORS
const initialState = {
    spots: {}
}

// REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:{
            const newState = {};
            // console.log('PASSING DATA TO REDUCER', action.spots)
            // console.log(action.payload)
            action.payload.forEach((spot) => (newState[spot.id] = spot));
            return newState;
        }
        case GET_CURRENT_SPOT:
            // return { ...state, [action.payload.id]: action.payload};
            return { ...state, currentSpot: action.payload};

        case CREATE_NEW_SPOT:
            return { ...state, spots: action.payload};
            // return { ...state, [action.payload.id]: action.payload};

        case EDIT_SPOT:
            return { ...state, [action.payload.id]: action.payload};

        case DELETE_SPOT:
            // This would be more if we were deleting all the spots
            // return { ...state, spots: null };
            return {
                ...state, [action.payload.id]: action.payload
            }
    default:
        return state;
    }
};

export default spotsReducer;
