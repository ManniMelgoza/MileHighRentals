import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCurrentSpot } from '../../store/spots';
import './SpotPage.css';

function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [mainImage, setMainImage] = useState(null);

    const spot = useSelector(state => state.spots);
    // const spotsArr = Object.values(spot)
    console.log('SPOT',spot)
    // console.log('SPOTARR', spotsArr.Spots)

    useEffect(() => {
        // if (spotId)
            dispatch(thunkCurrentSpot(spotId));
    }, [dispatch, spotId]);

if (!spot.id || !spot.SpotImages) return <div>Loading...</div>

    const {
        name,
        city,
        state,
        country,
        price,
        avgStarRating,
        numReviews,
        description,
        SpotImages,
        Owner
    } = spot;

    const previewImage = SpotImages?.find(img => img.preview) || SpotImages?.[0] || {};

    return (
        <div className="spot-details">
            <h1>{name}</h1>
            <p>{city}, {state}, {country}</p>

            {/* Image Display */}
            <div className="images-section">
    <div className="main-image-wrapper">
        <img
            className="main-image"
            src={mainImage || previewImage?.url}
            alt="Main Spot"
        />
    </div>
    <div className="thumbnails">
        {SpotImages.filter(img => img.url !== (mainImage || previewImage?.url)).map((img, i) => (
            <img
                key={i}
                src={img.url}
                alt={`Thumbnail ${i}`}
                className="thumbnail"
                onClick={() => setMainImage(img.url)}
            />
        ))}
    </div>
</div>

            {/* Owner & Description */}
            <div className="spot-info">
                <h2>Hosted by {Owner?.firstName} {Owner?.lastName}</h2>
                <p>{description}</p>
            </div>

            {/* Price + Ratings */}
            <div className="booking-box">
                <p><strong>${price}</strong> night</p>
                <p>⭐ {avgStarRating} · {numReviews} review{numReviews !== 1 && 's'}</p>
            </div>
        </div>
    );
}

export default SpotDetails;
