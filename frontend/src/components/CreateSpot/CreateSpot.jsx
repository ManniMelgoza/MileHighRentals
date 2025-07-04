import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
import { thunkCreateNewSpot } from "../../store/spots";
// import { thunkAddSpotImage } from "../../store/spot-images";
import { FaDollarSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./CreateSpot.css";

function CreateSpotFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setpreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !country ||
      !city ||
      !state ||
      !address ||
      !lat ||
      !lng ||
      !name ||
      !description ||
      !price ||
      !previewImage
    ) {
      return setErrors({
        country: "Country is required",
        address: "Address is required",
        city: "City is required",
        state: "State is required",
        lat: "Latitude is required",
        lng: "Longiture is required",
        description: "Description needs a minimum of 30 characters",
        name: "Name is required",
        price: "Price is required",
        previewImage: "Preview image is required.",
        image1: "Image URL must end in .png, .jpg, or .jpeg",
      });
    }

    return (
      dispatch(
        thunkCreateNewSpot({
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price
        })
      )
        // This is the section that the spotImage will be added
        // .then((newSpot) => {
        //   return dispatch(
        //     thunkAddSpotImage(newSpot.id, {
        //       url: previewImage,
        //       preview: true,
        //     })
        //   ).then(() => newSpot);
        // })
        .then((newSpot) => {
          navigate(`/spots/${newSpot.id}`);
        })
        .catch(async (response) => {
          const data = await response.json();
          // If the response contains validation errors, set them in state
          if (data?.errors) {
            setErrors(data.errors);
          }
        })
    );
  };

  // ERROR HANDLER SECTION

  //   const userValidation = username.length >= 4;
  //   const passwordValidation = password.length >= 5;
  const completedForm =
    !country ||
    !city ||
    !state ||
    !address ||
    !lat ||
    !lng ||
    !name ||
    !description ||
    !price;

  return (
    <div className="createSpotFormContainer">
      <h1>Create a new Spot</h1>
      <h2>Where&apos;s your place located?</h2>
      <p>
        Guest will only get your exact address once they booked a reservation.
      </p>

      <form onSubmit={handleSubmit} className="spotFormEntryBoxes">
        <label>
          Country
          <input
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        {errors.country && <p>{errors.country}</p>}
        <label>
          Street Address
          <input
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {errors.address && <p>{errors.address}</p>}
        <label>
          City
          <input
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        {errors.city && <p>{errors.city}</p>}
        <label>
          State
          <input
            type="text"
            value={state}
            placeholder="STATE"
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        {errors.state && <p>{errors.state}</p>}
        <label>
          Latitude
          <input
            type="text"
            value={lat}
            placeholder="Latitude"
            onChange={(e) => setLat(e.target.value)}
          />
        </label>
        {errors.lat && <p>{errors.lat}</p>}
        <label>
          Longitude
          <input
            type="text"
            value={lng}
            placeholder="Longitude"
            onChange={(e) => setLng(e.target.value)}
          />
        </label>
        {errors.lng && <p>{errors.lng}</p>}

        <div className="forLineDivider" />

        <label>
          <h2>Describe you place to guest</h2>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            rows="10"
            cols="50"
            type="textarea"
            value={description}
            placeholder="Please write at least 30 characters"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {errors.description && <p>{errors.description}</p>}
        <div className="forLineDivider" />
        <label>
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests&apos; attention with a spot title that highlights what
            makes your place special.
          </p>
          <input
            type="text"
            value={name}
            placeholder="Name of your spot"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <div className="forLineDivider" />
        <label>
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <FaDollarSign />
          <input
            type="number"
            value={price}
            placeholder="Price per night (USD)"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        {errors.price && <p>{errors.price}</p>}

        <div className="forLineDivider" />

        <label>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            value={previewImage}
            placeholder="Preview Image URL"
            onChange={(e) => setpreviewImage(e.target.value)}
          />
          <input
            type="text"
            value={image1}
            placeholder="Image URL"
            onChange={(e) => setImage1(e.target.value)}
          />
          <input
            type="text"
            value={image2}
            placeholder="Image URL"
            onChange={(e) => setImage2(e.target.value)}
          />
          <input
            type="text"
            value={image3}
            placeholder="Image URL"
            onChange={(e) => setImage3(e.target.value)}
          />
          <input
            type="text"
            value={image4}
            placeholder="Image URL"
            onChange={(e) => setImage4(e.target.value)}
          />
        </label>
        {errors.image && <p>{errors.image}</p>}
        <div className="forLineDivider" />
        <button type="submit" id="createSpotButton" disabled={completedForm}>
          Create Spot
        </button>
      </form>
    </div>
  );
}
export default CreateSpotFormModal;
