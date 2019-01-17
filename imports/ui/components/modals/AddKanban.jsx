// 新增看板modal
import React from 'react';
import styled from 'styled-components';
import { insert as insertKanban } from '../../api/kanban/methods';
import modalManager from '../../utils/modalManager';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Root = styled.div`
  > * {
    width: 100%;
  }
`

class AddKanban extends React.Component {
  state = {
    kanbanName: '',
  }

  onAddKanban = () => {
    const kanbanName = this.state.kanbanName;
    if(!kanbanName) return;

    console.log('创建看板', kanbanName);
    insertKanban.call({
      title: kanbanName,
      visibility: 'public',
    }, (err) => {
      if(err) {
        console.error('err', err);
      }

      modalManager.closeTop();
    })
  }

  render() {
    return (
      <Root>
        <TextField
          label={__('common.name')}
          value={this.state.kanbanName}
          onChange={(e) => this.setState({kanbanName: e.target.value})}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.onAddKanban}
        >创建</Button>
      </Root>
    )
  }
}

export default AddKanban;
