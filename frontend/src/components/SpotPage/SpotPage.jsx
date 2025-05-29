
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { thunkCurrentSpot } from '../../store/spots';
// import { FaStar } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { ReviewSpotInfo } from '../ReviewsSpots/ReviewSpotInfo'
// import './SpotPage.css';

// function SpotDetails() {
//     const { spotId } = useParams();
//     const dispatch = useDispatch();
//     // const [mainImage, setMainImage] = useState(null);

//     const spot = useSelector(state => state.spots);
//     const reviews = useSelector(state => state.reviews.reviews);

//     const sessionUser = useSelector((state) => state.session.user);

//      const reviewsArr = Object.values(reviews);
//     // const spotsArr = Object.values(spot)
//     // console.log('IMAGE DISPLAY',spot.currentSpot?.SpotImages.url)
//     // const spotsArr = Object.values(spot)
//     // console.log('SPOTARR', spotsArr.Spots)

//     const hasUserReviewed = sessionUser &&
//         reviewsArr.some(review => review.userId === sessionUser.id);


//     useEffect(() => {
//         if (spotId)
//             // console.log('HEY')
//             dispatch(thunkCurrentSpot(spotId));
//     }, [dispatch, spotId]);

// if (!spot.currentSpot) return <div>Loading...</div>

//     return (
//         <div className='spotDetailsWrap'>
//         <div className="spot-details">
//             <h1>{spot.currentSpot?.name}</h1>
//             <p>{spot.currentSpot.city}, {spot.currentSpot.state}, {spot.currentSpot.country}</p>

//             {/* Image Display */}
//             <div className="images-section">
//     <div className="main-image-wrapper">
//         <img
//             // className="main-image"
//             // src={mainImage || previewImage?.url}
//             src={spot.currentSpot?.SpotImages[0].url}
//             alt="Display Image of the Spot"
//             style={{ width: "300px", height: "300px", objectFit: "cover", border: '5px solid black'}}
//         />
//     </div>
//     <div className="thumbnails">
//         {spot.currentSpot?.SpotImages?.slice(1).map((img, i) => (
//             <img
//                 key={i}
//                 src={img.url}
//                 alt={`Thumbnail ${i}`}
//                 className="thumbnail"
//                 style={{ width: "120px", height: "120px", objectFit: "cover", border: '5px solid black'}}
//                 // onClick={() => setMainImage(img.url)}
//             />
//         ))}
//     </div>
// </div>
// </div>

//             {/* Price + Ratings */}
//             <div className="booking-box">
//                 <p><strong>${spot.currentSpot.price.toFixed(2)}</strong> night</p>
//                 {/* <p> <FaStar /> {spot.currentSpot.avgRating ? spot.currentSpot.avgRating.toFixed(1) : 'New'} · {spot.currentSpot.numReviews} Review{spot.currentSpot.numReviews !== 1 && 's'}</p> */}
//                 <p>
//                   <FaStar />  {" "}

//                     {spot.currentSpot.avgRating ? spot.currentSpot.avgRating.toFixed(1) : 'New'}

//                     {spot.currentSpot.numReviews > 0 && (
//                         <> · {spot.currentSpot.numReviews} Reviews</>
//                     )}
//                 </p>
//                 <button onClick={() => alert("Feature coming soon")}>
//                 Reserve
//                 </button>
//             </div>
//             {/* Owner & Description */}
//             <div className="spot-info">
//                 <h2>Hosted by {spot.currentSpot?.Owner?.firstName} {spot.currentSpot?.Owner?.lastName}</h2>
//                 <p>{spot.currentSpot.description}</p>
//             </div>
//         <div className="forLineDivider" />

//         {/* Button */}
//         <div>
//             <h2>
//                  <FaStar />  {" "}

//                     {spot.currentSpot.avgRating ? spot.currentSpot.avgRating.toFixed(1) : 'New'}

//                     {spot.currentSpot.numReviews > 0 && (
//                         <> · {spot.currentSpot.numReviews} Reviews</>
//                     )}
//             </h2>

//         </div>
//         <div>
//             {sessionUser && !hasUserReviewed && (
//                 <div>
//                     <Link to={`/spots/${spotId}/review`} className="newSpotLink">
//                         Post Your Review
//                     </Link>
//                 </div>
//             )}
//         </div>
//         <div>
//             <ReviewSpotInfo />
//         </div>
//         </div>
//     );
// }

// export default SpotDetails;


import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCurrentSpot } from '../../store/spots';
import { FaStar } from 'react-icons/fa';
import { ReviewSpotInfo } from '../ReviewsSpots/ReviewSpotInfo';
import './SpotPage.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const spot = useSelector(state => state.spots.currentSpot);
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews.reviews);

    useEffect(() => {
        if (spotId) dispatch(thunkCurrentSpot(spotId));
    }, [dispatch, spotId]);

    if (!spot) return <div>Loading...</div>;

    const reviewsArr = Object.values(reviews);
    const hasUserReviewed = sessionUser && reviewsArr.some(review =>
        review.userId === sessionUser.id && review.spotId === +spotId
    );

    return (
        <div className='spotDetailsWrap'>
            <div className="spot-details">
                <h1>{spot.name}</h1>
                <p>{spot.city}, {spot.state}, {spot.country}</p>

                {/* Image Display */}
                <div className="images-section">
                    <div className="main-image-wrapper">
                        <img
                            src={spot?.SpotImages?.[0]?.url}
                            alt="Main Spot"
                            style={{
                                width: "300px",
                                height: "300px",
                                objectFit: "cover",
                                border: '5px solid black'
                            }}
                        />
                    </div>
                    <div className="thumbnails">
                        {spot?.SpotImages?.slice(1)?.map((img, i) => (
                            <img
                                key={i}
                                src={img.url}
                                alt={`Thumbnail ${i}`}
                                className="thumbnail"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                    border: '5px solid black'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Price + Ratings */}
            <div className="booking-box">
                <p><strong>${Number(spot.price).toFixed(2)}</strong> night</p>
                <p>
                    <FaStar />{" "}
                    {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
                    {spot.numReviews > 0 && (
                        <> · {spot.numReviews} Reviews</>
                    )}
                </p>
                <button onClick={() => alert("Feature coming soon")}>
                    Reserve
                </button>
            </div>

            {/* Owner & Description */}
            <div className="spot-info">
                <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
                <p>{spot.description}</p>
            </div>

            <div className="forLineDivider" />

            {/* Ratings and Reviews */}
            <div>
                <h2>
                    <FaStar />{" "}
                    {spot.avgRating ? spot.avgRating.toFixed(1) : 'New'}
                    {spot.numReviews > 0 && (
                        <> · {spot.numReviews} Reviews</>
                    )}
                </h2>
            </div>

            {/* Conditionally Render "Post Your Review" Button */}
            {sessionUser && !hasUserReviewed && (
                <div className="post-review-btn">
                    <Link to={`/spots/${spotId}/review`} className="newSpotLink">
                        Post Your Review
                    </Link>
                </div>
            )}

            {/* Render Reviews */}
            <div>
                <ReviewSpotInfo />
            </div>
        </div>
    );
}

export default SpotDetails;
