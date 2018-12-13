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
    } = this.props;

    return (
      <div>
        <img src={src} />
        {
          this.state.isOpen && (
            <Lightbox mainSrc={src} onCloseRequest={() => this.setState({isOpen: false})} />
          )
        }
      </div>
    )
  }
}

LightboxImage.propTypes = {
  src: PropTypes.string,
}

export default LightboxImage;
