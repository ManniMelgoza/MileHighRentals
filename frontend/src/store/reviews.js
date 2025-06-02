import { csrfFetch } from "./csrf";

// ACTIONS
const GET_CURRENT_REVIEW = 'reviews/getCurrentReview';
const EDIT_REVIEW = 'reviews/editReview';
const ADD_REVIEW_IMAGE = 'reviews/addReviewImage'
const DELETE_REVIEW = 'reviews/deleteReview';
const CREATE_NEW_REVIEW = 'reviews/createNewReview';

// ACTION CREATORS

const createNewReviewAction = (newReview) => {
    return{
        type: CREATE_NEW_REVIEW,
        payload: newReview
    };
};

const getCurrentReviewAction = (review) => {
    return {
        type: GET_CURRENT_REVIEW,
        payload: review
    }
};

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        payload: review
    }
};

const addReviewImageAction = (review) => {
    return {
        type: ADD_REVIEW_IMAGE,
        payload: review
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        payload: reviewId
    }
};



// THUNKS
// const GET_CURRENT_REVIEW = 'reviews/getCurrentReview';
// The currentReview is being exported so it can be imported to other files
// Purpose: It makes the currentReview function accessible outside this module,
// allowing other parts of the application to use it.

// This would be considered a closure
// Outer Function: The outer function is currentReview, which returns another function: async (dispatch) => { ... }.
// Inner Function (Closure): The inner function, async (dispatch) => {...}, has access to the outer function's scope.

/*
export const currentReview = () => async (dispatch) => {

    () => {}: This is an arrow function that takes no parameters (it could have parameters, but it doesn’t in this case).
    async (dispatch) => {...}: This part is defining a function that takes dispatch as an argument, and it is marked as async, which means it will allow the use of await inside the function.

    async Purpose: It allows the function to use the await keyword inside its body, making it easier to handle asynchronous code (like API requests) by preventing the need to manually handle promises.

Dispatch
    What it is: This is the parameter for the inner function. It refers to the dispatch function from Redux, which is used to send actions to the Redux store.
    Purpose: The dispatch function allows this function to trigger Redux actions that will modify the application state.
*/

export const thunkCreateNewReview = (spotId, createReview) => async (dispatch) => {

    const {review, stars } = createReview;

    try {
        // TODO: THIS IS HOW IT WAS BEFORE CHANGING URL TEST
        // const response = await csrfFetch('/:spotId/reviews', {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {

            method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    review, stars
                }),
        });

        if (response.ok) {
            const data = await response.json();
            // console.log('NEW POST', data);
            dispatch(createNewReviewAction(data));
            return data;
        }  else {
            return Promise.reject(response);  // <--- let the component call res.json()
             }
            // const error = await response.json();
            // return { error: error.errors || ['Not able to create a new review'] };
        // }
        }   catch (err) {
            console.error('Error creating newReview:', err);
            return { error: ['Something went wrong. Please try again.'] };
        }
    };

export const currentReview = (spotId) => async (dispatch) => {
    /*
    const response = await csrfFetch("/api/reviews/current")
        What it is:
            const response: This declares a constant variable response that
            will hold the result of the API call.
            await: This is used to wait for the promise returned by csrfFetch to resolve before proceeding to the next line.
            csrfFetch("/api/reviews/current"): csrfFetch is presumably a custom function (likely a wrapper around the fetch API) that handles CSRF protection when making HTTP requests to the given URL (/api/reviews/current).
        Purpose: The function sends an HTTP GET request to the server endpoint "/api/reviews/current", and it waits for the server's response before continuing.
    */
    // const response = await csrfFetch("/api/reviews/current")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    /*
    const data = await response.json();
        What it is:
            const data: This declares a constant variable data to hold the parsed response body.
            await response.json(): This waits for the response.json() method, which parses the
            JSON body of the response, and assigns it to the data variable.
    */
    const data = await response.json();
    // console.log('REVIEW DATA Before', data)
    /*
    dispatch(getCurrentReviewAction(data.review));
        What it is:
            dispatch: This is the Redux dispatch function that will trigger an action.
            getCurrentReviewAction(data.review): This is likely an action creator that returns an action to store the current review data. It is passing data.review, which is the review extracted from the response.
        Purpose: This line dispatches an action to Redux with the data received from the server. The action is returned by getCurrentReviewAction, and it includes the review from data as its payload.
    */
    dispatch(getCurrentReviewAction(data.Reviews));
    // console.log('REVIEW DATA', data)
    /*
    return response;
        What it is: This returns the response object from the API call.
        Purpose: Returning the response object can be useful for further handling or testing outside the function. This could be a way to provide the caller of currentReview with access to the raw response if needed.
    */
    return data;
};

// const EDIT_REVIEW = 'reviews/editReview';
export const thunkEditReview = (reviewId, updateReview) => async (dispatch) => {
    // fetch data from api
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: 'PUT',
        body: JSON.stringify(updateReview)
    });
    if (response.ok){

        const data = await response.json();
        dispatch(editReviewAction(data))
        return data;

    } else {
        const error = await response.json();
        return { error: error.errors || ['Unable to edit review']}
         // throw errors;
    }
};

// coonst ADD_REVIEW_IMAGE = 'reviews/addReviewImage'
export const thunkAddReviewImage = (reviewId, reviewImage) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}/images`, {
        method: "POST",
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify(reviewImage)
    });
    if (response.ok){
        const data = await response.json();
        dispatch(addReviewImageAction(data))
        return data;
    } else {
       const error = await response.json();
        return { error: error.errors || ['Unable to add review image']}
         // throw errors;
    }

};

// const DELETE_REVIEW = 'reviews/deleteReview';
export const thunkDeleteReview = (reviewId) => async (dispatch) => {

    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (response.ok){

        dispatch(deleteReviewAction(reviewId))
        return response;
    } else {
        const error = await response.json();
        return { error: error.errors || ['unable to delete review']}
    }

};


// REDUCER REDUCER

const initialState = {
    reviews: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {

        case CREATE_NEW_REVIEW: {
            let newReview = { ...state }
            newReview[action.payload.id] = { ...action.payload }
            return newReview;
        }
        case GET_CURRENT_REVIEW:
            return { ...state, reviews: action.payload }
        case EDIT_REVIEW:
            return { ...state, [action.payload.id]: action.payload }
        case ADD_REVIEW_IMAGE:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_REVIEW:
            return { ...state, [action.payload.id]: action.payload}
    default:
        return state;
    }
};

export default reviewsReducer;
