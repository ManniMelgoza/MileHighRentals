import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
// import reviewsReducer from '../../store/reviews';
import { currentReview } from '../../store/reviews';
// import { FaStar } from 'react-icons/fa';
// import { Link } from 'react-router-dom';


export function ReviewSpotInfo(){

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const reviewList = useSelector((state) => state.reviews.reviews);

    const reviewArr = Object.values(reviewList)

    useEffect(() => {
        dispatch(currentReview(spotId));
    }, [dispatch, spotId]);


    // format date
    let formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US',{
            month: 'long',
            year: 'numeric'
        })
    };

    return (
        <>

        {reviewArr.length === 0 ? (
            <>
                {/* <Link to={`/spots/${spotId}/review`} className='newSpotLink'>Post Your Review</Link> */}
                <p>Be the first to post a review!</p>
            </>
        ) : (

            reviewArr?.map((review) => (

                <div key={review.id}>
                    {/* <p>{review.review.User}</p> */}
                    <p>{review.User?.firstName}</p>
                    <p>{formatDate(review.createdAt)}</p>
                    <p>{review.review}</p>
                    </div>
            ))
        )}
        </>
    )
}

export default ReviewSpotInfo;
