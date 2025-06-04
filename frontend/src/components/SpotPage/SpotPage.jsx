import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkCurrentSpot } from "../../store/spots";
import { FaStar } from "react-icons/fa";
import { ReviewSpotInfo } from "../ReviewsSpots/ReviewSpotInfo";
import ReviewButton from "../ReviewButton/ReviewButton";
import "./SpotPage.css";

function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots.currentSpot);
  // const reviews = useSelector(state => state.reviews.reviews);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (spotId) dispatch(thunkCurrentSpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <div>Loading...</div>;

  // const reviewsArr = Object.values(reviews);
  // const hasUserReviewed = sessionUser && reviewsArr.some(review =>
  //     review.userId === sessionUser.id && review.spotId === Number(spotId)
  // );

  let sessionLinks;
  //This if statemet is checking if there is a user loged in via the sessionUser varibale that was mention above, if sessionUser is true it will excecute the body of the if statement
  if (sessionUser) {
    //if the user is logged in or there is a user the sessionLinks variable will be assinged to the component ProfileButton with and passing a prop that will pass an obj of sessionsUsers delcared ealier
    // The seesionUser will be the infotmation of that session user that is logged in
    sessionLinks = (
      <>
        {/* <li>
        <Link to='/spots/new' className='newSpotLink'>Create a New Spot</Link>
      </li> */}
        <li>
          {/* <GiHamburgerMenu /> <FaUserCircle /> */}
          <ReviewButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    //  since the user is not logged in or there is a record the sessionLinks will be assinged to the LogIn and SingUp(buttons) JSX components
    // It will display both buttons to get the new user or current user to sign up or log in to the site
    sessionLinks = (
      //
      <li>{/* ADD SECONDEARY file */}</li>
    );
  }

  return (
    <div className="spotDetailsWrap">
      <div className="spot-details">
        <h1>{spot.Spots.name}</h1>
        <p>
          {spot.Spots.city}, {spot.Spots.state}, {spot.Spots.country}
        </p>

        {/* Image Display */}
        <div className="images-section">
          <div className="main-image-wrapper">
            <img
              src={spot?.Spots.SpotImages?.[0]?.url}
              alt="Main Spot"
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                border: "5px solid black",
              }}
            />
          </div>
          <div className="thumbnails">
            {spot?.Spots.SpotImages?.slice(1)?.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`Thumbnail ${i}`}
                className="thumbnail"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "5px solid black",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Price + Ratings */}
      <div className="booking-box">
        <p>
          <strong>${spot.Spots.price}</strong> night
        </p>
        <p>
          <FaStar />
          {spot.Spots.avgRating ? spot.Spots.avgRating.toFixed(1) : "New"}
          {/* {spot.Spots.numReviews > 0 && <> · {spot.Spots.numReviews} Reviews</>}
           */}
          {spot.Spots.numReviews > 0 && (
            <> · {spot.Spots.numReviews} {spot.Spots.numReviews === 1 ? "Review" : "Reviews"}</>
          )}
        </p>
        <button onClick={() => alert("Feature coming soon")}>Reserve</button>
      </div>

      {/* Owner & Description */}
      <div className="spot-info">
        <h2>
          Hosted by {spot.Spots.Owner?.firstName} {spot.Spots.Owner?.lastName}
        </h2>
        <p>{spot.Spots.description}</p>
      </div>

      <div className="forLineDivider" />

      {/* Ratings and Reviews */}
      <div>
        <h2>
          <FaStar />{" "}
          {spot.Spots.avgRating ? spot.Spots.avgRating.toFixed(1) : "New"}
          {spot.Spots.numReviews > 0 && (
            <> · {spot.Spots.numReviews} {spot.Spots.numReviews === 1 ? "Review" : "Reviews"}</>
          )}


        </h2>
      </div>

      {/* Conditionally Render "Post Your Review" Button */}
      <div className="sessionlinks">{sessionLinks}</div>

      {/* Render Reviews */}
      <div>
        <ReviewSpotInfo />
      </div>
    </div>
  );
}

export default SpotDetails;
