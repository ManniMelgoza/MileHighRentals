// a special function that comes form the contet folder
import { useModal } from '../../context/Modal';

// this is the creation of a react component that has destructuring the pieces from props
function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  // set two funtions in a destructure way to the userModal special function that was passed to the file
  // object destructuring. You're saying “give me these two functions from the object that useModal returns.”

  // setModalContent: the remote control to decide what appears inside the modal.
  // the callback manager—like telling the assistant, “When the user closes this modal, do this thing.”
  const { setModalContent, setOnModalClose } = useModal();

  // arrow function that is stored in a variable named onClick
  const onClick = () => {
    // the callback manager—like telling the assistant, “When the user closes this modal, do this thing.”
    // setOnModalClose(onModalClose): If yes, we register that function to run when the modal is closed.
    if (onModalClose) setOnModalClose(onModalClose);
    // Shows the modal with the specified content (a React component).
    setModalContent(modalComponent);
    // If the button click handler is actually a function, then run it.
    if (typeof onButtonClick === "function") onButtonClick();
  };
  // when the button is clicked there will be an action trigger and
  // {buttonText}: The text that appears on the button comes from the buttonText prop.
  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
