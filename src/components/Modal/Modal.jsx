import { Loader } from 'components/Loader/Loader';
import React from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoaded: false,
    };
  }

  componentDidMount() {
    const closeByEscape = e => {
      if (e.code === 'Escape') {
        this.props.closeModal();
      }
    };

    const handleKeyDown = e => closeByEscape(e);
    window.addEventListener('keydown', handleKeyDown);
    this.loadImage();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  loadImage() {
    const { modalImg } = this.props;
    const loadImage = new Image();
    loadImage.src = modalImg;

    loadImage.onload = () => {
      this.setState({
        isLoading: false,
        isLoaded: true,
      });
    };
  }

  render() {
    const { modalImg, alt, closeModal } = this.props;
    const { isLoading, isLoaded } = this.state;

    return createPortal(
      <div className="Overlay" onClick={closeModal}>
        <div className="Modal">
          {isLoading ? (
            <div className="LoaderOverlay">
              <Loader />
            </div>
          ) : (
            isLoaded && (
              <img
                src={modalImg}
                alt={alt}
                onClick={e => e.stopPropagation()}
              />
            )
          )}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
