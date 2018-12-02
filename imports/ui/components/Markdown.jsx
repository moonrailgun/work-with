import React from 'react';
import PropTypes from 'prop-types';
import xss from 'xss';
import ReactMarkdown from 'react-markdown';

class Markdown extends React.Component {
  render() {
    return (
      <ReactMarkdown>
        {xss(this.props.children)}
      </ReactMarkdown>
    )
  }
}

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Markdown;
