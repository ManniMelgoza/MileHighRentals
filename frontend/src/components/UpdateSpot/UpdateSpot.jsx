import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import * as spotsActions from '../../store/spots';
import './UpdateSpot.css';

function UpdateSpotForm() {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setpreviewImage] = useState("")
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [errors, setErrors] = useState({});

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // This line is getting all the spots but its being hold by the variable of spot
    // state.spots (spots comes drom the store file )

    const spot = useSelector(state => state.spots);
    // console.log('ID', spotId)
    // console.log('SPOT', spot.currentSpot?.Spots?.SpotImages[0].url)

    useEffect(() => {
        if (spotId) {
            dispatch(spotsActions.thunkCurrentSpot(spotId));
        }
    }, [dispatch, spotId]);

    useEffect(() => {
        if (spot) {
            setAddress(spot.currentSpot?.Spots.address || "");
            setCity(spot.currentSpot?.Spots.city || "");
            setState(spot.currentSpot?.Spots.state || "")
            setCountry(spot.currentSpot?.Spots.country || "")
            setName(spot.currentSpot?.Spots.name || "")
            setDescription(spot.currentSpot?.Spots.description || "")
            setPrice(spot.currentSpot?.Spots.price || "")
            setpreviewImage(spot.currentSpot?.Spots?.SpotImages[0].url || "")
        }
    }, [spot])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (address && city && state && country && name && description && price) {
            try {
                const updatedSpot = await dispatch(
                    spotsActions.thunkEditSpot(spotId, {
                        address,
                        city,
                        state,
                        country,
                        name,
                        description,
                        price,
                        previewImage,
                    })
                );

                if (updatedSpot && !updatedSpot.error) {
                    // Navigate to the updated spot's details page
                    navigate(`/spots/${updatedSpot.spotId}`);
                }
            } catch (error) {
                if (error && error.json) {
                    const data = await error.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                }
            }
        }
    }

    return (
        <div className='createSpotFormContainer'>
            <h1>Update your Spot</h1>
            <h2>Where&apos;s your place located?</h2>
            <p>Guest will only get your exact address once they booked a reservation.</p>

            <form onSubmit={handleSubmit} className='spotFormEntryBoxes'>
                <label>
                    Country
                    <input
                        type='text'
                        value={country}
                        placeholder="Country"
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                {errors.country && <p>{errors.country}</p>}

                <label>
                    Street Address
                    <input
                        type='text'
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                {errors.address && <p>{errors.address}</p>}

                <label>
                    City
                    <input
                        type='text'
                        value={city}
                        placeholder="City"
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
                {errors.city && <p>{errors.city}</p>}

                <label>
                    State
                    <input
                        type='text'
                        value={state}
                        placeholder="STATE"
                        onChange={(e) => setState(e.target.value)}
                        required
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
                    <textarea rows='10' cols='50'
                        type='textarea'
                        value={description}
                        placeholder="Please write at least 30 characters"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}

                <div className="forLineDivider" />

                <label>
                    <h2>Create a title for your spot</h2>
                    <p>
                    Catch guests&apos; attention with a spot title that highlights what makes
                    your place special.
                    </p>
                    <input
                        type='text'
                        value={name}
                        placeholder="Name of your spot"
                        onChange={(e) => setName(e.target.value)}
                        required
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
                    <input
                        type='number'
                        value={price}
                        placeholder="Price per night (USD)"
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </label>

                {errors.price && <p>{errors.price}</p>}

                <div className="forLineDivider" />

                <label>
                    <h2>Liven up your spot with photos</h2>
                    <p>
                    Submit a link to at least one photo to publish your spot.
                    </p>
                    <input
                        type='text'
                        value={previewImage}
                        placeholder="Preview Image URL"
                        onChange={(e) => setpreviewImage(e.target.value)}
                    />
                    <input
                        type='text'
                        value={image1}
                        placeholder="Image URL"
                        onChange={(e) => setImage1(e.target.value)}
                    />
                    <input
                        type='text'
                        value={image2}
                        placeholder="Image URL"
                        onChange={(e) => setImage2(e.target.value)}
                    />
                    <input
                        type='text'
                        value={image3}
                        placeholder="Image URL"
                        onChange={(e) => setImage3(e.target.value)}
                    />
                    <input
                        type='text'
                        value={image4}
                        placeholder="Image URL"
                        onChange={(e) => setImage4(e.target.value)}
                    />
                </label>
                {errors.image && <p>{errors.image}</p>}

                <div className="forLineDivider" />

                <button type='submit' id="createSpotButton">Update your Spot</button>
            </form>
        </div>
    )
}

export default UpdateSpotForm;
