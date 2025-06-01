import { useDispatch } from "react-redux";
import { thunkDeleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";


function ManageDeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteSpot(spotId))
    .then(closeModal);
  };
  return (
    <>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button onClick={handleDelete} style={{ color:'white', backgroundColor: "red" }}>
        Yes (Delete Spot)
      </button>
      <button onClick={closeModal} style={{ color:'white', backgroundColor: "gray" }}>
        {" "}
        No (Keep Spot)
      </button>
    </>
  );
}

export default ManageDeleteSpotModal;
