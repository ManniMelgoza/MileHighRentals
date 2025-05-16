import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkRetriveAllSpots } from "../../store/spots"

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
        const rating = spot.avgRating || 0;
        const maxRating = 5;
        const percentage = (rating / maxRating) * 100;

        return (
          <div key={spot.id} className="imageDisplayBox">
            <img
              src={spot.previewImage}
              alt={spot.name}
              style={{ width: "300px", height: "300px", objectFit: "cover" }}
            />
             <div className="locationRating">
    <p className="locationText">
              {spot.city}, {spot.state}
            </p>

            <div className="stars" style={{ "--rating-width": `${percentage}%` }}>
              <span className="stars-base">★★★★★</span>
              <span className="stars-overlay">★★★★★</span>
            </div>
            </div>

            <p>${spot.price} night</p>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage
