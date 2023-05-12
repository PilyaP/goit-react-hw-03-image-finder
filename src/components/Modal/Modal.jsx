import { Loader } from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalImg, alt, closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const closeByEscape = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    const handleKeyDown = e => closeByEscape(e);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  useEffect(() => {
    setIsLoading(true);
    setIsLoaded(false);

    const loadImage = new Image();
    loadImage.src = modalImg;

    loadImage.onload = () => {
      setIsLoading(false);
      setIsLoaded(true);
    };

    return () => {
      loadImage.onload = null;
    };
  }, [modalImg]);

  return createPortal(
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal">
        {isLoading ? (
          <div className="LoaderOverlay">
            <Loader />
          </div>
        ) : (
          isLoaded && (
            <img src={modalImg} alt={alt} onClick={e => e.stopPropagation()} />
          )
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
