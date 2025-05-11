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
        payload: spotId
    };
};

// THUNK PER ACTION
// const GET_ALL_SPOTS = "spots/getAllSpots"; ACTION

export const thunkRetriveAllSpots = () => async (dispatch) => {
    const response = await csrfFetch("api/spots");
    const data = await response.json();
    dispatch(getAllSpotsAction(data.spots));
    return response;
};

// const GET_CURRENT_SPOT = "spots/getCurrentSpot"; ACTION

export const thunkCurrentSpot = () => async (dispatch) => {
    const response = await csrfFetch("api/current");
    const data = await response.json();
    dispatch(getCurrentSpotAction(data.spot));
    return response;
};

// const CREATE_NEW_SPOT = "spots/createNewSpot"; ACTION
export const thunkCreateNewSpot = (spots) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spots;

    const response = await csrfFetch("api/spots", {
        method: "POST",
        body: JSON.stringify({
            address, city, state, country, lat, lng, name, description, price
        })
    });
    if(response.ok){

        const data = await response.json();
        dispatch(createNewSpotAction(data.spots));
        return response;
    } else {
        const errors = await response.json();
        throw errors;
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
        const errors = await response.json();
        throw errors;
    }
};

// const DELETE_SPOT = " spots/deleteSpot" ACTION
export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    dispatch(deleteSpotAction(spotId))
    return response;
}

// ACTION CREATORS
const initialState = {
    spots: {}
}

// REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS:
        return { ...state, spots: action.payload};

        case GET_CURRENT_SPOT:
            return { ...state, spots: action.payload};

        case CREATE_NEW_SPOT:
            return { ...state, spots: action.payload};

        case EDIT_SPOT:
            return { ...state, [action.payload.id]: action.payload};

        case DELETE_SPOT:
            // This would be more if we were deleting all the spots
            // return { ...state, spots: null };
            return {
                ...state,
                [action.payload.id]: action.payload
            }
    default:
        return state;
    }
};

export default spotsReducer;
