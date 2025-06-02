/*
The MenuButton component renders a user menu dropdown (typically for login/signup options) \
that opens when the user clicks a button (with icons), and closes when the user clicks outside the menu.
*/

// Imports react hooks from the react library
import { useState, useEffect, useRef } from 'react';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import './ReviewButton.css'
import { useParams } from 'react-router-dom';


function ReviewButton() {
    const { spotId } = useParams();
    // const spot = useSelector(state => state.spots.currentSpot);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };
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

       document.addEventListener('click', closeMenu);

    // Cleanup: removes the listener to avoid memory leaks.
    return () => document.removeEventListener('click', closeMenu);
    // by having the showMenu in the arr, this useEffect only be trigger when the showMenu changes
    }, [showMenu]);

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
          <OpenModalButton
          onClick={toggleMenu}
          className={ulClassName} ref={ulRef}
          buttonText="Post Your Review"
          modalComponent={<ReviewFormModal spotId={spotId}  />}
          />
        </>
    );
}
// END OF FUNCTION
export default ReviewButton;
