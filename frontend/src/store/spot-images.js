import { csrfFetch } from "./csrf";

// /api/spot-images/:imageId
// Actions
const ADD_SPOT_IMAGE = "spot-images/addSpotImage"
const DELETE_SPOT_IMAGE = "spot-images/deleteSpotImage"

// Action Creators
const addSpotImageAction = (spotImage) => {
    return {
        type: ADD_SPOT_IMAGE,
        payload: spotImage
    }
};

const deleteSpotImageAction = (spotImage) => {
    return {
        type: DELETE_SPOT_IMAGE,
        payload: spotImage
    }
};

// Thunk

export const thunkGetSpotImage = (spotsId) => async (dispatch) => {
    const response = csrfFetch(`/api/spots/${spotsId}/images`);

    if (response.ok){
        const data = (await response).json();
        dispatch(addSpotImageAction(data))
        return data;
    } else {
        const error = await response.json();
        return { error: error.errors || ['No Data Retrieved']}
    }
}

export const thunkDeleteSpotImage = (imageId) => async (dispatcd) => {
    const response = await csrfFetch(`/apispots/images/${imageId}`, {
        method: 'DELETE'
    });
    if (response.ok){

        dispatcd(deleteSpotImageAction(imageId));
        return response;
    } else {
        const error = await response.json();
        return { error: error.errors || ['No Data Retrieved']}
    }
}
// Reducers

const initialState = {
    spotsImage: {}
}

const spotImageReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_SPOT_IMAGE:
            return { ...state, spotImage: action.payload}

        case DELETE_SPOT_IMAGE:
            return { ...state, [action.payload.id]: action.payload}
    default:
        return state;
    }
};

export default spotImageReducer;
