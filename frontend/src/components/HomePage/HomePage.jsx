import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkRetriveAllSpots } from "../../store/spots"
import { Tooltip } from 'react-tooltip'

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
        <>
            <h1>Spots List</h1>
            {/* maps do {parenthesis} because is JSX, but function is JS are {curlies} */}
            {spotsArr?.map((spot) => {
    console.log('Spot:', spot);
    return (
        <div key={spot.id}>
            {/* <Tooltip anchorSelect=".my-anchor-element" place="bottom">
                {spot.name}
            </Tooltip> */}
            <img

            src={spot.previewImage}
            alt={spot.name}
            style={{ width: '300px', height: '300px'}}
            />
            <p>{spot.city}, {spot.state}</p>
            <p>${spot.price} night</p>
        </div>
    );
})}
        </>
    );
};

export default HomePage;
