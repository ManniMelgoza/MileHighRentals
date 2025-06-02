import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkRetriveAllSpots } from "../../store/spots";
import  ManageDeleteSpotModal  from '../ManageSpot/ManageDeleteSpotModal';
import  OpenModalButton  from '../OpenModalButton/OpenModalButton';
import { FaStar } from "react-icons/fa";
import "./ManageSpot.css";

function ManageSpot() {
  const dispatch = useDispatch();

  const spotsAll = useSelector((state) => state.spots);
  const loggedUser = useSelector((state) => state.session?.user);

  const toggleDelete = (e) => {
    e.stopPropagation();
  }; // ← fixed: added closing brace and semicolon

  useEffect(() => {
    dispatch(thunkRetriveAllSpots());
  }, [dispatch]);

  console.log("loggedUser:", loggedUser);
  console.log("spotsAll:", spotsAll);

  if (!spotsAll || !loggedUser) return <div>Loading...</div>;

  const spotsList = Object.values(spotsAll);
  const userOwnedSpots = spotsList.filter(
    (spot) => spot.ownerId === loggedUser.id
  );

  return (
    <div className="spot-details">
      <h1 className="manageSpotTitle">Manage Spots</h1>
      <Link to="/spots/new" className="newSpotLink">
        Create a New Spot
      </Link>

      <div className="imageContainerBox">
        {userOwnedSpots.map((spot) => {
          return (
            <div key={spot.id}>
              <Link
                to={`/spots/${spot.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="imageDisplayBox">
                  <img
                    src={spot.previewImage}
                    alt={spot.name}
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                      border: "5px solid black",
                    }}
                  />
                  <div className="locationRating">
                    <p className="locationText">
                      {spot.city}, {spot.state}
                    </p>
                    <div className="stars">
                      <FaStar />
                      {spot.avgRating ? Number(spot?.avgRating).toFixed(1) : "New"}
                    </div>
                    <p>
                      <strong>$ {Number(spot.price).toFixed(2)}</strong> night
                    </p>
                  </div>
                </div>
              </Link>
              <ul>
                <li>
                  <Link to={`/spots/${spot.id}/edit`} className="newSpotLink">
                    Update
                  </Link>
                </li>
                <li>
                  <div onClick={toggleDelete}>
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<ManageDeleteSpotModal spotId={spot.id}/>}
                    />
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default ManageSpot;
