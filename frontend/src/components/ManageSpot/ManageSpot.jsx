import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCurrentSpot } from '../../store/spots';
// import { FaStar } from 'react-icons/fa';
import './ManageSpot.css';

function ManageSpot() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    // const [mainImage, setMainImage] = useState(null);

    const spot = useSelector(state => state.spots);
    // const spotsArr = Object.values(spot)
    console.log('IMAGE DISPLAY', spot[spotId])
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

// if (!spot.currentSpot) return <div>Loading...</div>

    console.log('SPOT', spot.city)
    // const previewImage = spot.SpotImages?.find(img => img.preview) || spot.currentSpot?.SpotImages?.[0] || {};

    return (
        <div className="spot-details">
            <h1>Manage Your Spot</h1>
            {/* <p>{spot.currentSpot.city}, {spot.currentSpot.state}, {spot.currentSpot.country}</p> */}

          {/* Image Display */}
            <div >
    <div className="main-image-wrapper">
        <img
            // className="main-image"
            // src={mainImage || previewImage?.url}
            src={spot.currentSpot?.SpotImages[0].url}
            alt="Display Image of the Spot"
            style={{ width: "300px", height: "300px", objectFit: "cover", border: '5px solid black'}}
        />
        <p>{spot.currentSpot?.city}</p>
    </div>

</div>
        </div>
    );
}

export default ManageSpot;
