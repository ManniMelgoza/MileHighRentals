import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCurrentSpot } from '../../store/spots';
import './SpotPage.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const [mainImage, setMainImage] = useState(null);

    const spot = useSelector(state => state.spots);
    // const spotsArr = Object.values(spot)
    console.log('SPOT',spot.currentSpot?.Owner?.firstName)
    // const spotsArr = Object.values(spot)
    // console.log('SPOTARR', spotsArr.Spots)

    useEffect(() => {
        if (spotId)
            console.log('HEY')
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


    // const previewImage = spot.SpotImages?.find(img => img.preview) || SpotImages?.[0] || {};

    return (
        <div className="spot-details">
            <h1>{spot.currentSpot?.name}</h1>
            <p>{spot.currentSpot.city}, {spot.currentSpot.state}, {spot.currentSpot.country}</p>

            {/* Image Display */}
            <div className="images-section">
    {/* <div className="main-image-wrapper">
        <img
            className="main-image"
            // src={mainImage || previewImage?.url}
            // src={spot.currentSpot.SpotImages.spotId}
            alt="Display Image of the Spot"
        />
    </div> */}
    {/* <div className="thumbnails">
        {SpotImages.filter(img => img.url !== (mainImage || previewImage?.url)).map((img, i) => (
            <img
                key={i}
                src={img.url}
                alt={`Thumbnail ${i}`}
                className="thumbnail"
                onClick={() => setMainImage(img.url)}
            />
        ))}
    </div> */}
</div>

            {/* Owner & Description */}
            <div className="spot-info">
                <h2>Hosted by {spot.currentSpot?.Owner?.firstName} {spot.currentSpot?.Owner?.lastName}</h2>
                <p>{spot.currentSpot.description}</p>
            </div>

            {/* Price + Ratings */}
            <div className="booking-box">
                <p><strong>${spot.currentSpot.price}</strong> night</p>
                <p>{spot.currentSpot.avgStarRating} · {spot.currentSpot.numReviews} review{spot.currentSpot.numReviews !== 1 && 's'}</p>
                <button onClick={() => alert("Feature coming soon")}>
                Reserve
                </button>
            </div>
        </div>
    );
}

export default SpotDetails;
