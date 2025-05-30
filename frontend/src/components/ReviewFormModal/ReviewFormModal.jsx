import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreateNewReview } from '../../store/spots';


import './ReviewFormModal.css';


function ReviewFormModal(){

    const dispatch = useDispatch();
    const [reviewTextBox, setReviewTextBox] = useState('');
    const [stars, setStars] = useState('');

    const [errors, setErrors] = useState('')
    const { closeModal } = useModal();

    // form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();

        if (reviewTextBox.length < 10 || stars.length === 0){
            setErrors({});

            return dispatch(
                thunkCreateNewReview({
                    review: reviewTextBox,
                    stars: Number(stars)
                }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();

                if (data?.errors) {
                    setErrors(data.errors);
                }
            });
        }
        return setErrors({
            stars: 'You need at least one star',
            reviewTextBox: 'You need at least 10 characters'
        });
    };


    return (

        <div>

            <h1>How was your stay?</h1>

            <form onSubmit={handleSubmit} className='formContainer'>
             <label>
                <h2>Describe you place to guest</h2>
                <p>
                Mention the best features of your space, any special amentities like
                fast wifi or parking, and what you love about the neighborhood.
                </p>
                <textarea rows='10' cols='50'
                    type='textarea'
                    value={reviewTextBox}
                    placeholder="Leave your review here..."
                    onChange={(e) => setReviewTextBox(e.target.value)}

                />
            </label>
              {errors.reviewTextBox && <p>{errors.reviewTextBox}</p>}

            <label>

                <input
                    type='number'
                    value={stars}
                    placeholder="Price per night (USD)"
                    onChange={(e) => setStars(e.target.value)}
                />
            </label>
            {errors.price && <p>{errors.price}</p>}
                <button type='submit' id='createReviewButton'>Submit Your Review</button>
            </form>
        </div>
    )
}

export default ReviewFormModal;
