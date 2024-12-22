/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";

const BackdropOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black bg-opacity-75" />
  );
};

const ModalOverlay = ({ children, handleHideModal }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-start justify-end z-30">
      <div
        onClick={handleHideModal}
        className="fixed top-0 left-0 w-full h-screen"
      />
      <div
        className="bg-white rounded-bl-lg shadow-lg text-gray-900 z-40 overflow-hidden"
        // transform transition-transform duration-300 ease-in-out"
      >
        {children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById("modal");

const Modal = ({ children, handleHideModal }) => {
  return (
    <>
      {ReactDOM.createPortal(<BackdropOverlay />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay handleHideModal={handleHideModal}>
          {children}
        </ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
