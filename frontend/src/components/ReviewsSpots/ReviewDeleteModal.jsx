import { useDispatch } from "react-redux";
import { thunkDeleteReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { currentReview } from '../../store/reviews';


function ReviewDeleteModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();

 return dispatch(thunkDeleteReview(reviewId))
      .then(() => dispatch(currentReview(spotId)))
      .then(() => {
        window.location.reload();
        closeModal();
      })
   };
  return (
    <>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <button onClick={handleDelete} style={{ color:'white', backgroundColor: "red" }}>
        Yes (Delete Review)
      </button>
      <button onClick={closeModal} style={{ color:'white', backgroundColor: "gray" }}>
        {" "}
        No (Keep Review)
      </button>
    </>
  );
}

export default ReviewDeleteModal;
