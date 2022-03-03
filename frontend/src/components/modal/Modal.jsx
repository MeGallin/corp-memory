import React, { useState } from 'react';
import './Modal.scss';

const Modal = ({ openButtonTitle, closeButtonTitle, props }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  return (
    <>
      {showModal ? (
        <div>
          <div
            title="Close modal"
            className={showModal ? 'modal-overlay' : null}
            onClick={() => setShowModal(false)}
          />
          <div className="modal-wrapper">
            <button
              onClick={() => setShowModal(false)}
              className="confirmation"
            >
              {closeButtonTitle}
            </button>
            {props}
          </div>
        </div>
      ) : null}
      <button type="button" onClick={handleShowModal} className="modal-btn">
        {openButtonTitle}
      </button>
    </>
  );
};

export default Modal;
