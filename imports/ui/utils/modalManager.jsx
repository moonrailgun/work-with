import React from 'react';
import ReactDOM from 'react-dom';

import Modal from '@material-ui/core/Modal';

const modalManager = {
  _list: [],
  open: function(body) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const el = React.createElement(Modal, {
      open: true, onClose: () => this.closeTop()
    }, body);
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
