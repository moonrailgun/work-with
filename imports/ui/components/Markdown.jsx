import React from 'react';
import PropTypes from 'prop-types';
import xss from 'xss';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import LightboxImage from './LightboxImage';

const StyledMarkdown = styled(ReactMarkdown)`
  ul {
    margin: 0;
    padding-left: 0;
    list-style:none;
  }

  pre {
    overflow: auto;
  }

  img {
    max-width: 100%;
  }
`

class Markdown extends React.Component {
  extRenderers = {
    image: (item) => {
      return (
        <LightboxImage src={item.src} title={item.title} alt={item.alt} />
      )
    }
  }

  render() {
    return (
      <StyledMarkdown linkTarget="_blank" renderers={this.extRenderers}>
        {xss(this.props.children)}
      </StyledMarkdown>
    )
  }
}

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Markdown;
