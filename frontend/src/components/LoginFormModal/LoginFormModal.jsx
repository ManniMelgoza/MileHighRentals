// This imports the useState hook from React.
import { useState } from 'react';
// This imports all exported members from the ../store/session file into an object named sessionActions.
import * as sessionActions from '../../store/session';
// This imports the useDispatch hook from react-redux.
// useDispatch lets you dispatch Redux actions (like login) from inside a React component.
import { useDispatch } from 'react-redux';
// Imports a custom React context hook called useModal, which gives you access to modal-related logic.
// useModal likely includes functions like closeModal to close the modal UI.
import { useModal } from '../../context/Modal';
// Imports the CSS file
import './LoginForm.css';

// Defines a functional component named LoginFormModal
function LoginFormModal() {
  // Creates a dispatch function so you can send actions to the Redux store
  const dispatch = useDispatch();
  // Initializes credential (either a username or email) with an empty string.
  // setCredential updates this value when the user types
  const [credential, setCredential] = useState("");
  // Initializes password as an empty string.
  // setPassword is used to update the value on input change
  const [password, setPassword] = useState("");
  // Initializes an empty object errors.
  // setErrors is used to store and display any validation errors from the server.
  const [errors, setErrors] = useState({});

  // Destructures the closeModal function from the useModal context.
  // This will be called when login is successful to close the modal.
  const { closeModal } = useModal();

// THE START FOR THE LOG IN OF A USER ALREADY ON THE DB
// THE START FOR THE LOG IN OF A USER ALREADY ON THE DB
  // Starts the submit handler function for the form.
  const handleSubmit = (e) => {
    // Prevents the default form submission behavior (which would reload the page).
    e.preventDefault();
    // Clears any existing errors before submitting the new form data.
    setErrors({});

    // Dispatches the login action with the provided credential and password.
    return dispatch(sessionActions.login({ credential, password }))
        // If login is successful, it closes the modal.
      .then(closeModal)
      // If login fails (e.g. invalid credentials), it catches the error.
      .catch(async (res) => {
        // Waits for the response body to be parsed as JSON.
        const data = await res.json();
        // If there are validation errors returned, update the errors state to display them in the UI.
        if (data && data.errors) {
          setErrors(data.errors);
        }
        // THE START FOR DEMO-USER PRELOAD LOGIN // THE START FOR DEMO-USER PRELOAD LOGIN

        // THE END FOR DEMO-USER PRELOAD LOGIN // THE END FOR DEMO-USER PRELOAD LOGIN
      })
    }
      const handleDemoLogIn = () => {
        const demoUser = {
          credential: "Demo-lition",
          password: 'password'
        };

        dispatch(sessionActions.login(demoUser))
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();

            if(data && data.errors) {
              setErrors(data.errors);
            }
          })
      }
  // THE END FOR THE LOG IN OF A USER ALREADY ON THE DB
  // THE END FOR THE LOG IN OF A USER ALREADY ON THE DB
  return (
    <>
      <h1>Log In</h1>
      {/* Starts a form that calls handleSubmit on submission. */}
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            // Its value is tied to credential,
            value={credential}
            // and updates with setCredential.
            onChange={(e) => setCredential(e.target.value)}
            // required means the browser won't allow submitting if it's empty.
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit">Log In</button>
        <br />
        <button type='button' onClick={handleDemoLogIn}>Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
