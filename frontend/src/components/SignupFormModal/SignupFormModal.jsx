// Import React's useState hook to manage form input and error state
import { useState } from 'react';
// Import useDispatch from react-redux to dispatch actions to the Redux store
import { useDispatch } from 'react-redux';
// Import useModal custom hook to control modal behavior (e.g., closing the modal)
import { useModal } from '../../context/Modal';
// Import all session-related action creators (like signup) as an object
import * as sessionActions from '../../store/session';
// import { thunkCreateNewSpot } from '../../store/spots';
// Import CSS styles for the SignupForm component
import './SignupForm.css';


// Define a functional React component for the Signup form modal
function SignupFormModal() {
    // Create a dispatch function to send actions to the Redux store
    const dispatch = useDispatch();
    // Create state for the email input field
    const [email, setEmail] = useState("");
    // Create state for the username input field
    const [username, setUsername] = useState("");
    // Create state for the first name input field
    const [firstName, setFirstName] = useState("");
    // Create state for the last name input field
    const [lastName, setLastName] = useState("");
    // Create state for the password input field
    const [password, setPassword] = useState("");
    // Create state for the confirm password input field
    const [confirmPassword, setConfirmPassword] = useState("");
    // Create state to store any validation or server errors
    const [errors, setErrors] = useState({});
    // Destructure the closeModal function from useModal context
    const { closeModal } = useModal();


  // Define a function to handle form submission
  const handleSubmit = (e) => {
    // Prevent default form submission behavior (i.e., page reload)
    e.preventDefault();

    // Check if password and confirmPassword fields match
    if (password === confirmPassword) {
      // Clear any previous errors
      setErrors({});

      // Dispatch the signup action with user details
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        // If signup succeeds, close the modal
        .then(closeModal)

        // If signup fails, catch the error and parse the response
        .catch(async (res) => {
          const data = await res.json();

          // If the response contains validation errors, set them in state
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }

    // If passwords don't match, set an error message for confirmPassword
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field",

    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className='formContainer'>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" id='signUpButton'>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
