import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import theme from './theme';

import Modal from '@material-ui/core/Modal';

const ModalBody = styled.div`
  position: absolute;
  background-color: ${theme.palette.background.paper};
  box-shadow: ${theme.shadows[5]};
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing.unit * 4}px;
  padding-top: ${theme.spacing.unit * 3}px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  outline: 0;
  max-width: 90%;
  max-height: 80%;
  overflow: auto;
`

const modalManager = {
  _list: [],
  open: function(body, props) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const modalBody = React.createElement(ModalBody, {}, body);
    const el = React.createElement(Modal, Object.assign({}, props, {
      open: true, onClose: () => this.closeTop()
    }), modalBody);
    ReactDOM.render(el, div);

    this._list.push(div);
  },
  closeTop: function() {
    let top = this._list.pop();
    if(top) {
      ReactDOM.unmountComponentAtNode(top);
      document.body.removeChild(top);
    }
  },
  closeAll: function() {
    for (let div of this._list) {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    }
    this._list = [];
  }
}

export default modalManager;
