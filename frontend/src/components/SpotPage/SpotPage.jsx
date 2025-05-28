
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCurrentSpot } from '../../store/spots';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ReviewSpotInfo } from '../ReviewsSpots/ReviewSpotInfo'
import './SpotPage.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const [mainImage, setMainImage] = useState(null);

    const spot = useSelector(state => state.spots);
    // const spotsArr = Object.values(spot)
    // console.log('IMAGE DISPLAY',spot.currentSpot?.SpotImages.url)
    // const spotsArr = Object.values(spot)
    // console.log('SPOTARR', spotsArr.Spots)



    useEffect(() => {
        if (spotId)
            // console.log('HEY')
            dispatch(thunkCurrentSpot(spotId));
    }, [dispatch, spotId]);

    // const {
    //     name,
    //     city,
    //     state,
    //     country,
    //     price,
    //     avgStarRating,
    //     numReviews,
    //     description,
    //     SpotImages,
    //     Owner
    // } = spot;

if (!spot.currentSpot) return <div>Loading...</div>


    // const previewImage = spot.SpotImages?.find(img => img.preview) || spot.currentSpot?.SpotImages?.[0] || {};

    return (
        <div className='spotDetailsWrap'>
        <div className="spot-details">
            <h1>{spot.currentSpot?.name}</h1>
            <p>{spot.currentSpot.city}, {spot.currentSpot.state}, {spot.currentSpot.country}</p>

            {/* Image Display */}
            <div className="images-section">
    <div className="main-image-wrapper">
        <img
            // className="main-image"
            // src={mainImage || previewImage?.url}
            src={spot.currentSpot?.SpotImages[0].url}
            alt="Display Image of the Spot"
            style={{ width: "300px", height: "300px", objectFit: "cover", border: '5px solid black'}}
        />
    </div>
    <div className="thumbnails">
        {spot.currentSpot?.SpotImages?.slice(1).map((img, i) => (
            <img
                key={i}
                src={img.url}
                alt={`Thumbnail ${i}`}
                className="thumbnail"
                style={{ width: "120px", height: "120px", objectFit: "cover", border: '5px solid black'}}
                // onClick={() => setMainImage(img.url)}
            />
        ))}
    </div>
</div>
</div>

            {/* Price + Ratings */}
            <div className="booking-box">
                <p><strong>${spot.currentSpot.price.toFixed(2)}</strong> night</p>
                {/* <p> <FaStar /> {spot.currentSpot.avgRating ? spot.currentSpot.avgRating.toFixed(1) : 'New'} · {spot.currentSpot.numReviews} Review{spot.currentSpot.numReviews !== 1 && 's'}</p> */}
                <p>
                  <FaStar />  {" "}

                    {spot.currentSpot.avgRating ? spot.currentSpot.avgRating.toFixed(1) : 'New'}

                    {spot.currentSpot.numReviews > 0 && (
                        <> · {spot.currentSpot.numReviews} Reviews</>
                    )}
                </p>
                <button onClick={() => alert("Feature coming soon")}>
                Reserve
                </button>
            </div>
            {/* Owner & Description */}
            <div className="spot-info">
                <h2>Hosted by {spot.currentSpot?.Owner?.firstName} {spot.currentSpot?.Owner?.lastName}</h2>
                <p>{spot.currentSpot.description}</p>
            </div>
        <div className="forLineDivider" />

        {/* Button */}
        <div>
            <h2>
                 <FaStar />  {" "}

                    {spot.currentSpot.avgRating ? spot.currentSpot.avgRating.toFixed(1) : 'New'}

                    {spot.currentSpot.numReviews > 0 && (
                        <> · {spot.currentSpot.numReviews} Reviews</>
                    )}
            </h2>

        </div>
        <div>
        {/* TODO: Need to change the route  */}
        <Link to='/spots/new' className='newSpotLink'>Post Your Review</Link>
        <ReviewSpotInfo />
        </div>
        </div>
    );
}

export default SpotDetails;
