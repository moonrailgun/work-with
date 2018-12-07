import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Markdown from './Markdown';
import { remove } from '/imports/api/card/methods';

import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NotesIcon from '@material-ui/icons/Notes';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const Root = styled.div`
  border-radius: ${props => props.theme.shape.borderRadius}px;
  padding: ${props => props.theme.spacing.unit}px;
  user-select: none;
  background-color: ${props => props.theme.palette.common.white};
  box-shadow: 'none';
  display: flex;

  &:hover, &:active {
    box-shadow: ${props => props.theme.shadows[1]};
  }

  .main {
    flex: 1;
    padding: ${props => props.theme.spacing.unit}px 0 0;
    width: 0;
    overflow-wrap: break-word;
  }

  .type, .action {
    & > svg {
      font-size: 1rem;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      color: ${props => props.theme.palette.grey[700]};
    }
    margin: ${props => props.theme.spacing.unit}px;
  }

  .action {
    cursor: pointer;

    & > svg {
      &:hover, &:active {
        color: ${props => props.theme.palette.primary['light']};
      }
    }
  }
`

const EditModal = styled(Modal)`
  main {
    position: absolute;
    width: ${props => props.theme.spacing.unit * 70}px;
    background-color: ${props => props.theme.palette.background.paper};
    box-shadow: ${props => props.theme.shadows[5]};
    border-radius: ${props => props.theme.shape.borderRadius}px;
    padding: ${props => props.theme.spacing.unit * 4}px;
    padding-top: ${props => props.theme.spacing.unit * 3}px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: 0;
  }
`

class CardItem extends React.Component {
  state = {
    isShowToggleMenu: false,
    isShowEditModel: false,
    editContent: '',
  }
  _toggleMenuRef = null;

  _handleClickMore(e) {
    this._toggleMenuRef = e.currentTarget;
    this.setState({isShowToggleMenu: true})
  }

  _handleEdit() {
    this.setState({
      isShowToggleMenu: false,
      isShowEditModel: true,
      editContent: this.props.cardContent
    });
  }

  _handleEditSave() {
    console.log('TODO 保存变更:', this.state.editContent);
  }

  _handleDelete() {
    this.setState({isShowToggleMenu: false});
    console.log('delete card:', this.props.cardId);
    remove.call({
      cardId: this.props.cardId
    }, (err) => err && console.log('delete card error:', err))
  }

  renderEditModal() {
    // TODO: 需要一个全局的管理器, 而不是每个card一个
    // 会产生bug: 打开后拖拽会导致card被拖动
    return this.state.isShowEditModel && (
      <EditModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.isShowEditModel}
        onClose={() => this.setState({isShowEditModel: false})}
        onDrag={() => false}
      >
        <main>
          <TextField
            placeholder="输入内容..."
            fullWidth
            margin="normal"
            variant="outlined"
            autoFocus
            fullWidth
            multiline
            rows="4"
            rowsMax="8"
            value={this.state.editContent}
            onChange={e => this.setState({editContent: e.target.value})}
          />
          <Button color="primary" onClick={() => this.setState({isShowEditModel: false})}>取消</Button>
          <Button color="primary" onClick={() => this._handleEditSave()}>保存</Button>
        </main>
      </EditModal>
    )
  }

  renderToggleMenu() {
    return (
      <Popper
        open={this.state.isShowToggleMenu}
        placement="bottom-end"
        anchorEl={this._toggleMenuRef}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => this.setState({isShowToggleMenu: false})}>
                <MenuList>
                  <MenuItem onClick={() => this._handleEdit()}>{__('common.edit')}</MenuItem>
                  <MenuItem onClick={() => console.log('TODO:move')}>{__('common.move')}</MenuItem>
                  <MenuItem onClick={() => this._handleDelete()}>{__('common.delete')}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    )
  }

  render() {
    return (
      <Root>
        <div className="type"><NotesIcon /></div>
        <div className="main">
          <Markdown>{this.props.cardContent}</Markdown>
        </div>
        <div className="action" onClick={(e) => this._handleClickMore(e)}>
          <MoreHorizIcon />
        </div>
        { this.renderToggleMenu() }
        { this.renderEditModal() }
      </Root>
    )
  }
}

CardItem.propTypes = {
  cardId: PropTypes.string,
  cardContent: PropTypes.string,
}

export default CardItem;
