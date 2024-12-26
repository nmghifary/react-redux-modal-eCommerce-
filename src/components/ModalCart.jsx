/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";

const ModalOverlay = ({ children, handleHideModal, isOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center z-30 transition-all duration-300
    ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div
        onClick={handleHideModal}
        className="fixed top-0 left-0 w-full h-screen z-20 bg-black bg-opacity-75"
      />
      <div className="min-w-[70%] max-w-[80%] bg-white p-4 rounded-lg shadow-lg text-gray-900 mx-2 z-40">
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
