import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkRetriveAllSpots } from "../../store/spots"
import { FaStar } from 'react-icons/fa';
import { FaDollarSign } from "react-icons/fa6";


// import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./HomePage.css";

const HomePage = () => {
    const dispatch = useDispatch();
    //
    const spotList = useSelector((state) => state.spots);
    const spotsArr = Object.values(spotList)
    // console.log('SPOTLIST', spotsArr)

    // The useEffect will get all the spots from the Redux Store
    useEffect(() => {
        dispatch(thunkRetriveAllSpots());
    }, [dispatch]);

   return (
    <div className="imageContainerBox">
      {spotsArr?.map((spot) => {
        // const rating = spot.avgRating || 0;
        // const maxRating = 5;
        // const percentage = (rating / maxRating) * 100;

        return (
          <>
            <Link to={`/spots/${spot.id}`} style={{textDecoration: 'none', color: "black" }}>
              <div key={spot.id} className="imageDisplayBox">
                <img
                  src={spot.previewImage}
                  alt={spot.name}
                  style={{ width: "300px", height: "300px", objectFit: "cover", border: '5px solid black'}}
                />
                <div className="locationRating">
                  <p className="locationText">
                  {spot.city}, {spot.state}
                </p>

                <div className="stars">
                <FaStar />{ " " }
                {/* {spot.avgRating ? Number((spot.avgRating)).toFixed(1) : 'New'} */}
                 {spot.avgRating ? spot.avgRating : 'New'}
                </div>
                </div>

                <p> <FaDollarSign />
                {/* <strong>{Number(spot.price).toFixed(2)}</strong> night</p> */}
                <strong>{spot.price}</strong> night</p>
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default HomePage
