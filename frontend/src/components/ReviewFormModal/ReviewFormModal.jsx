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

    const formButtonDisableValidation = reviewTextBox.length >= 10 && Number(stars) >= 1;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formButtonDisableValidation){
            setErrors({
                stars: 'You need at least one star',
                reviewTextBox: 'You need at least 10 characters'
            });
            return;

        }

        setErrors({});

            dispatch(
                thunkCreateNewReview({
                    review: reviewTextBox,
                    stars: Number(stars)
                })
            )
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();

                if (data?.errors) {
                    setErrors(data.errors);
                }
            });
        }

    return (

        <div>
            <form onSubmit={handleSubmit} className='formContainer'>
            <h1>How was your stay?</h1>
             <label>
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
                    placeholder="Stars"
                    min='1'
                    max='5'
                    onChange={(e) => setStars(e.target.value)}
                />
            </label>
            {errors.stars && <p>{errors.stars}</p>}
                <button type='submit' id='createReviewButton' disabled={!formButtonDisableValidation}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default ReviewFormModal;
