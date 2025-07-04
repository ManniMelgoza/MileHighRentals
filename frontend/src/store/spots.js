import { csrfFetch } from "./csrf";

// create actions
const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_CURRENT_SPOT = "spots/getCurrentSpot";
const CREATE_NEW_SPOT = "spots/createNewSpot";
const EDIT_SPOT = "spots/editSpot";
const DELETE_SPOT = "spots/deleteSpot"
const CREATE_NEW_REVIEW = 'spots/createNewReview';


// ACTION CREATORS

const createNewReviewAction = (newReview) => {
    return{
        type: CREATE_NEW_REVIEW,
        payload: newReview
    };
};

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

const createNewSpotAction = (newSpot) => {
    return {
        type: CREATE_NEW_SPOT,
        payload: newSpot
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

export const thunkCreateNewReview = (spotId, newReview) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newReview)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createNewReviewAction(data, spotId));
    return data;
  } else {
        const error = await response.json();
        return { error: error.errors || ['Unable to edit review']}
         // throw errors;
    }
};

    // const CREATE_NEW_SPOT = "spots/createNewSpot"; ACTION
export const thunkCreateNewSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price, /*previewImage*/ } = spot;

    try {
        const response = await csrfFetch("/api/spots", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price,
                // previewImage
            }),
        });

        if (response.ok) {
            const data = await response.json();
            // console.log('NEW POST', data);
            dispatch(createNewSpotAction(data));
            return data;
        } else {
            const error = await response.json();
            return { error: error.errors || ['Not able to create a new spot'] };
        }
    } catch (err) {
        console.error('Error creating spot:', err);
        return { error: ['Something went wrong. Please try again.'] };
    }
};

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
        const newSpot = await response.json();
        dispatch(getCurrentSpotAction(newSpot));
        // dispatch(getCurrentSpotAction(newSpot.Spots));
        // console.log('SPOT THUNK DATA', newSpot)
        return newSpot;
    } else {
        const error = await response.json();
        return { error: error.errors || ['No Data Retrieved of current spot']}
    }
};



// const EDIT_SPOT = "spots/editSpot"; ACTION
export const thunkEditSpot = (id, updateSpot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateSpot)
    });

    if (response.ok) {
        const updateSpot = await response.json();
        dispatch(editSpotAction(updateSpot))
        return updateSpot;
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
    // spots: {}
}

// REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER REUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_NEW_REVIEW: {
        {
        let newReview = { ...state}
        newReview[action.payload.id] = { ...action.payload}
        return newReview

      }

            //     const newReview = {};
            // // console.log('PASSING DATA TO REDUCER', action.spots)
            // // console.log(action.payload)
            // action.payload.forEach((review) => (newReview[review.id] = review));
            // return newReview;
    }
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

        case CREATE_NEW_SPOT:{
            let newState = { ...state }
            newState[action.payload.id] = {...action.payload}
            return newState;
        }
        case EDIT_SPOT:
            return { ...state, [action.payload.id]: action.payload};

        case DELETE_SPOT: {
            let newState = { ...state };
            // delete newState[action.spotId];
            delete newState[action.payload];
            return newState;
        }
    default:
        return state;
    }
};

export default spotsReducer;
