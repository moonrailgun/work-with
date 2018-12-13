import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class LightboxImage extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    const {
      src,
      title,
      alt,
    } = this.props;

    return (
      <React.Fragment>
        <img src={src} title={title} alt={alt} onClick={() => this.setState({isOpen: true})} />
        {
          this.state.isOpen && (
            <Lightbox mainSrc={src} onCloseRequest={() => this.setState({isOpen: false})} />
          )
        }
      </React.Fragment>
    )
  }
}

LightboxImage.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
}

export default LightboxImage;
