import React from 'react';
import PropTypes from 'prop-types';
import xss from 'xss';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

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
  render() {
    return (
      <StyledMarkdown linkTarget="_blank">
        {xss(this.props.children)}
      </StyledMarkdown>
    )
  }
}

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Markdown;
