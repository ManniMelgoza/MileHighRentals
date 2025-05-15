// Imports react hooks from the react library
import { useState, useEffect, useRef } from 'react';
// useDispatch: This gives you the ability to send messages (actions) to the Redux store — like calling out orders in a restaurant kitchen.
import { useDispatch } from 'react-redux';
// This is a visual icon component — a little user circle you can display on screen.
import { FaUserCircle } from 'react-icons/fa';
/*
Imports everything from the session store file as an object called sessionActions
“Bring in everything from that file, and put it under the name sessionActions.”
Now you can access sessionActions.logout, sessionActions.login
*/
import * as sessionActions from '../../store/session';
// Not sure if I need this here, keep for now
/*
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
*/

import './ProfileButton.css';
// Delcaration of react componets that takes in a prop as a destructure to get the user
// You’re a receptionist (component) that gets a user folder (object) passed to you, and you open it to find out their name, email, etc
function ProfileButton({ user }) {
  // set useDispatch to a variable that You call useDispatch() to get the dispatch function — lets you send actions to the Redux store.
  const dispatch = useDispatch();
  // use state hook
  // showMenu A booelan that keeps track of the menue visibility
  // setShowMenu a fucnton that changes the value
  // the initial state of the useState is set to false
  const [showMenu, setShowMenu] = useState(false);
  // Creates a reference to an HTML element (the dropdown menu).
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  // TOGGLE OF MENU
  useEffect(() => {
    // This runs every time showMenu changes. If the menu isn't open, it exits early.
    if (!showMenu) return;

    // This defines a function that checks if you clicked outside the menu. If so, it closes the menu.
    const closeMenu = (e) => {
      // ulRef.current: The actual DOM element for the menu.
      // The element that was clicked.
      // Checks whether the menu contains the click. If it doesn’t, close it.
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    // Adds the listener to the whole page.
    document.addEventListener('click', closeMenu);

    // Cleanup: removes the listener to avoid memory leaks.
    return () => document.removeEventListener('click', closeMenu);
    // by having the showMenu in the arr, this useEffect only be trigger when the showMenu changes
  }, [showMenu]);

  // LOGOUT FUNCTION

  const logout = (e) => {
    // Stops the default button behavior (like form submission).
    e.preventDefault();
    // Sends a logout action to Redux.
    dispatch(sessionActions.logout());
  };

  // Combines class names based on whether the menu is visible.
  // If showMenu === true, className is "profile-dropdown".
  // If showMenu === false, className is "profile-dropdown hidden".

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  // Anything with in the retun will be rendered
  return (
    <>
      {/* When the button is clicked, it opens or closes the menu. */}
      <button onClick={toggleMenu}>
        {/* Shows the users icon */}
        <FaUserCircle />
      </button>
      {/*  */}
      <ul className={ulClassName} ref={ulRef}>
        {/* the display of data of the user */}
        <li>{user.username}</li>
        <li>Hello {user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>

          {/* A logout button that triggers the logout function */}
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
