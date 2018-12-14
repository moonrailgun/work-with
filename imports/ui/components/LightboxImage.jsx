import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const Root = styled.span`
  > img {
    cursor: pointer;
  }
`

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
      <Root>
        <img src={src} title={title} alt={alt} onClick={() => this.setState({isOpen: true})} />
        {
          this.state.isOpen && (
            <Lightbox mainSrc={src} onCloseRequest={() => this.setState({isOpen: false})} />
          )
        }
      </Root>
    )
  }
}

LightboxImage.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
}

export default LightboxImage;
