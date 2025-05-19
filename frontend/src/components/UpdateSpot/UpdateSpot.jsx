import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
import * as spotsActions from '../../store/spots';
import './UpdateSpot.css';


function UpdateSpotForm() {

    const dispatch = useDispatch();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setpreviewImage] = useState("")
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState({});
    // const {closeModal} = useModal();


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        if (address && city && state && country && name && description && price){

        return dispatch(
            spotsActions.thunkCreateNewSpot({
                address,
                city,
                state,
                country,
                name,
                description,
                price
            }))

            // .then(closeModal)


            .catch(async (res) => {
                const data = await res.json();

                // If the response contains validation errors, set them in state
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    }

}


//    .catch(async (res) => {
//         try {
//           const text = await res.text();
//           const data = text ? JSON.parse(text) : null;
//           if (data?.errors) setErrors(data.errors);
//           else setErrors({ general: "Something went wrong" });
//         } catch {
//           setErrors({ general: "Invalid server response" });
//         }
//       });
//   }
// };

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
            {errors.sate && <p>{errors.state}</p>}
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
                    required
                />
                <input
                    type='text'
                    value={image}
                    placeholder="Image URL"
                    onChange={(e) => setImage(e.target.value)}

                />
                <input
                    type='text'
                    value={image}
                    placeholder="Image URL"
                    onChange={(e) => setImage(e.target.value)}

                />
                <input
                    type='text'
                    value={image}
                    placeholder="Image URL"
                    onChange={(e) => setImage(e.target.value)}

                />
                <input
                    type='text'
                    value={image}
                    placeholder="Image URL"
                    onChange={(e) => setImage(e.target.value)}

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
