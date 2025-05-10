// You're looking at a full React modal context system — meaning it gives you global control of showing and hiding modal windows anywhere in your app.

// Importing react components from the ract library
import { useRef, useState, useContext, createContext } from 'react';
// lets you render elements outside the normal DOM flow.
import ReactDOM from 'react-dom';
// imports the css style that will go into this component
import './Modal.css';

/* ModalContext: name of the context — the global "box" where modal info will be stored.
 createContext(): makes the empty context.
This is the name of the variable holding the context.
It’s a common naming convention: <FeatureName>Context.
*/

const ModalContext = createContext();

/*
React component
{ children }: destructures props to get children,
which are the nested components inside <ModalProvider>.
*/
export function ModalProvider({ children }) {
  /*
  modalRef: this is a pointer/bookmark to a real DOM element.
  useRef(): initializes a ref object with .current as undefined.
  */
  const modalRef = useRef();

  /*
    useState(null): initializes modalContent with null.
    modalContent: the actual content/component you want to show in the modal.
    setModalContent: function to update modalContent.
  */

  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);


  // closeModal: function that will be called to close the modal.
  const closeModal = () => {
    // setModalContent(null): hides the modal.
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:

    // if (typeof onModalClose === "function"): checks if there's a valid callback.
    if (typeof onModalClose === "function") {
      // setOnModalClose(null): clears it so it doesn’t run again accidentally.
      setOnModalClose(null);
      // onModalClose(): runs the cleanup function.
      onModalClose();
    }
  };

  // Bundles all the tools you want to share via context.
  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      {/* <ModalContext.Provider value={...}>: allows child components to access modal tools. */}
      <ModalContext.Provider value={contextValue}>
        {/* {children}: all child components inside <ModalProvider> get rendered. */}
        {children}
      </ModalContext.Provider>
      {/* <div ref={modalRef} />: creates the DOM target the modal will render into. */}
      <div ref={modalRef} />
    </>
  );
}

// This exports a named React functional component called Modal, allowing it to be imported and used elsewhere.
export function Modal() {
  //using context to access it throuhg out the app

  /*
    Accesses the React context named ModalContext via useContext.
    Destructures three values:
      modalRef: A ref object that refers to the DOM node where the modal should be rendered.
      modalContent: The actual content (likely JSX) to be displayed inside the modal.
      closeModal: A function used to close the modal (likely sets some state to null or false).

  */
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
    /*
      This is a safety check to prevent rendering the modal under invalid conditions:
        !modalRef: Checks if the ref is missing.
        !modalRef.current: Checks if the ref has not yet been assigned a DOM element.
        !modalContent: If there is no content to show in the modal.
    */
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current
  );
}

export const useModal = () => useContext(ModalContext);
