/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";

const ModalOverlay = ({ children, handleHideModal, isOpen }) => {
  console.log(isOpen);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-start justify-end z-30">
      <div
        onClick={handleHideModal}
        className="fixed top-0 left-0 w-full h-screen z-20 bg-black bg-opacity-75"
      />
      <div
        className={`w-80 h-screen bg-white rounded-bl-lg shadow-lg text-gray-900 z-30 overflow-hidden transition-transform transform duration-500
         ${isOpen ? "translate-x-0" : "translate-x-80"}`}
      >
        {children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById("modal");

const Modal = ({ children, handleHideModal, isOpen }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay handleHideModal={handleHideModal} isOpen={isOpen}>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
