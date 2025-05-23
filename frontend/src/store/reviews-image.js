import { csrfFetch } from "./csrf";

// ACTION
const DELETE_REVIEW_IMAGE  = 'reviews-images/deleteReviewImage';

// ACTION CREATOR

const deleteReviewImageAction = (imageId) => {
    return {
        type: DELETE_REVIEW_IMAGE,
        payload: imageId
    }
};

// THUNK
export const deleteReviewImageThunk = (imageId) => async (dispatch) => {

    const response = await csrfFetch(`/api/review-images/${imageId}`, {
        method: "DELETE"
    });
    if(response.ok){

        dispatch(deleteReviewImageAction(imageId));
        return response;
    } else {
        const error = await response.json();
        return { error: error.errors || ['Unable to delete review image']}
    }
};

// REDUCER
const initialState = {
    reviewImages: {}
}
const deleteReviewImageReducer = (state = initialState, action) => {
    switch(action.type) {
        case DELETE_REVIEW_IMAGE:
            return { ...state, [action.payload.id]: action.payload }
        default:
            return state;
    }
};

export default deleteReviewImageReducer;
