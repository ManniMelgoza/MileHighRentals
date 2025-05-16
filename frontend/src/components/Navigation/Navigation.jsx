// It creates navigation links that apply styling when the route matches
import { Link, NavLink } from 'react-router-dom';
// A React-Redux hook. Lets React components read data from the Redux store. Its a function that reads data from Redux
import { useSelector } from 'react-redux';
// This is importing the ProfileButton from the same folder directory (./)
import ProfileButton from './ProfileButton';
// TODO: come back to explain what OpenModalButton does
import OpenModalButton from  '../OpenModalButton/OpenModalButton';
//  TODO: GIVE BETTER EXPLANATION //Used when the user is not authenticated.
import LoginFormModal from '../LoginFormModal/LoginFormModal';
//  TODO: GIVE BETTER EXPLANATION
import SignupFormModal from '../SignupFormModal/SignupFormModal';
// Imports the css file for the navigation
import './Navigation.css';

// a function Navigation that passes a destructured proped, isLoaded most likely a boolean value
function Navigation({ isLoaded }) {
  // sessionUser will hold the logged-in user data that is being access by the useSelector that retrieves data from the redux store selector
  // userSelector A hook function that allows React components to acces specific pieces of state in redux via callback
  // (state is the obj of the redux store) => (arrorw function) state(entireRedux store).session(slice of Redux state tree).user(represents the current logged in user or null)
  const sessionUser = useSelector((state) => state.session.user);

  // This variable will store react elements depending if the user is logged in or not.
  // This variable is in the global state that will be used to add the JSX component with in the if and else statement to later be rendered int he DOM
  let sessionLinks;
  //This if statemet is checking if there is a user loged in via the sessionUser varibale that was mention above, if sessionUser is true it will excecute the body of the if statement
  if (sessionUser) {
    //if the user is logged in or there is a user the sessionLinks variable will be assinged to the component ProfileButton with and passing a prop that will pass an obj of sessionsUsers delcared ealier
    // The seesionUser will be the infotmation of that session user that is logged in
    sessionLinks = (
     <>
      <li>
        <Link to='/spots' className='newSpotLink'>Create a New Spot</Link>
      </li>
      <li>
        <ProfileButton user={sessionUser} />
      </li>
     </>
    );
  } else {
    //  since the user is not logged in or there is a record the sessionLinks will be assinged to the LogIn and SingUp(buttons) JSX components
    // It will display both buttons to get the new user or current user to sign up or log in to the site
    sessionLinks = (
    <>
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    </>
    );
  }
  // Anything inside the return statement will render any JSX components
  return (
    <nav className='navigation-box'>
        <div className='nav-left'>
          <NavLink to="/">
            <img src="/MileHighRentalsLogo.png" alt='Mile High Rentals Logo' />
          </NavLink>
        </div>
  {/* A link to the homepage (<NavLink to="/">Home</NavLink>)
  Additional navigation options (from sessionLinks) only if isLoaded is true:
  If the user is logged in: show profile button.
  If not: show login and signup buttons. */}

    {/* -if isLoaded is FALSE && sessionLink will render the signUp and logIn buttons
        -if isLoaded is TRUE && sessionLInk will render the profilebutton with the currentUsers info that is coming from sessionsUsers
        */}
      <ul className='nav-right'>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
