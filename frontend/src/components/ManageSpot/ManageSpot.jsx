import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCurrentSpot } from '../../store/spots';
// import { thunkEditSpot} from '../../store/spots';
// import { thunkDeleteSpot } from '../../store/spots';
import { FaStar } from 'react-icons/fa';
import './ManageSpot.css';

function ManageSpot() {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const [mainImage, setMainImage] = useState(null);

    // console.log('IMAGE DISPLAY', spot.currentSpot.SpotImages[0].url)
    const spot = useSelector(state => state.spots);
    // const spotsArr = Object.values(spot)
    // const spotsArr = Object.values(spot)
    // console.log('SPOTARR', spotsArr.Spots)

    useEffect(() => {
        if (id)
            // console.log('HEY')
            dispatch(thunkCurrentSpot(id));
    }, [dispatch, id]);

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

    console.log('SPOT', spot.spots)
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
            src={spot.currentSpot}
            alt="Display Image of the Spot"
            style={{ width: "300px", height: "300px", objectFit: "cover", border: '5px solid black'}}
        />
        <p>{spot.currentSpot?.city}, {spot.currentSpot?.state} {''}<FaStar />  {" "}

                                {/* {spot.currentSpot ? Number(spot.currentSpot?.avgRating)?.toFixed(1) : 'New'} */}
                                {spot.currentSpot ? spot.currentSpot?.avgRating : 'New'}

                                {spot.currentSpot?.numReviews > 0 && (
                                    <> · {spot.currentSpot.numReviews} Reviews</>
                                )}</p>
                                <p>{spot.currentSpot?.price}</p>
    </div>
    <>

     <li>
        <Link to='/api/spots/:id' className='newSpotLink'>Update</Link>
    </li>
    <li>
        <Link to={`/:id`} className='newSpotLink'>Delete</Link>
    </li>
    </>
    { ' ' }

</div>
        </div>
    );
}

export default ManageSpot;
