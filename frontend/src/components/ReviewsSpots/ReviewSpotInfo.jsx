import { useEffect } from "react";
// import { Link } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReviewDeleteModal from "./ReviewDeleteModal";
// import reviewsReducer from '../../store/reviews';
import { currentReview } from "../../store/reviews";
// import { FaStar } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import ReviewButt  on from '../ReviewButton/ReviewButton';

export function ReviewSpotInfo() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.reviews.reviews);
  const sessionUser = useSelector((state) => state.session.user);

  // NEED THIS TO HAVE THE TEXT OF THE FIRST POST TO NOT BE VISIBLE
  // const sessionUser = useSelector(state => state.session.user);
  // const spot = useSelector(state => state.spots.currentSpot);
  // const isOwnerSpot = sessionUser?.id === spot?.ownerId;

  const reviewArr = Object.values(reviewList).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    dispatch(currentReview(spotId));
  }, [dispatch, spotId]);

  // format date
  let formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      //   day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {reviewArr.length === 0 && <p>Be the first to post a review!</p>}

      {reviewArr?.map((review) => (
        <div key={review.id}>
          <p>
            {review.User?.firstName} {review.User?.lastName}
          </p>
          <p>{formatDate(review.createdAt)}</p>
          <p>{review.review}</p>
          {sessionUser && sessionUser.id === review.userId && (
            <OpenModalButton
              buttonText="Delete"
              modalComponent={
              <ReviewDeleteModal reviewId={review.id} spotId={spotId} />
              }
            />
          )}
        </div>
      ))}
    </>
  );
}

export default ReviewSpotInfo;
