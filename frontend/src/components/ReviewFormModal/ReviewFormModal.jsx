import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import { thunkCreateNewReview } from '../../store/spots';
// import { thunkCreateNewReview } from '../../store/reviews';


import './ReviewFormModal.css';


function ReviewFormModal({spotId}){
    const navigate = useNavigate();
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
// return dispatch (
           dispatch(
                thunkCreateNewReview(spotId,{
                    review: reviewTextBox,
                    stars: Number(stars)
                })
            )

            .then(() => {
                closeModal();
                // window.location.reload();
                navigate(`/spots/${spotId}`);
            })
            // .then(()=> {
            //     // closeModal();
            //     // window.location.reload();
            //     navigate(`/spots/${spotId}`)
            // })
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

            {/* TODO:Need to change the way the rating system looks */}
            <label>
                <input
                    type='number'
                    value={stars}
                    placeholder="0"
                    min='1'
                    max='5'
                    onChange={(e) => setStars(e.target.value)}
                    />
                    <p>star</p>
            </label>
            {errors.stars && <p>{errors.stars}</p>}
                <button type='submit' id='createReviewButton' disabled={!formButtonDisableValidation}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default ReviewFormModal;
