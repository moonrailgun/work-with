import React from 'react';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { insert as insertCard } from '/imports/api/card/methods';
import { archiveCol } from '/imports/api/kanban/methods';
import styled from 'styled-components';
import CardItem from './CardItem';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ClearIcon from '@material-ui/icons/Clear';

const getListStyle = isDraggingOver => ({
  // outline: isDraggingOver ? 1 : 0,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
});

const styles = ({shape, spacing, shadows, palette, typography, zIndex}) => ({
  gridItem: {
    flexShrink: 0,
    position: 'relative',
  },
  col: {
    borderRadius: shape.borderRadius,
    padding: spacing.unit,
    backgroundColor: '#dfe3e6',
    boxShadow: shadows[2],
  },
  colAdd: {
    borderRadius: shape.borderRadius,
    boxShadow: shadows[2],
    padding: 0,
    backgroundColor: 'rgba(0,0,0,.24)',
    color: palette.common.white,
  },
  colAddGrow: {
    position: 'absolute',
    top: spacing.unit,
    left: spacing.unit,
    right: spacing.unit,
    padding: spacing.unit * 2,
    minWidth: 180,
  },
  colTitle: {
    flex: 1
  },
  colActionBtn: {
    color: palette.grey['A400'],
    "&:hover": {
      color: palette.primary['light'],
      cursor: 'pointer'
    }
  },
  colToggleMenu: {
    zIndex: zIndex.tooltip
  },
  cardAddField: {
    padding: spacing.unit,
    fontSize: typography.fontSize
  },
  cardAddBtn: {
    width: '50%',
  },
  draggableCard: {
    marginTop: spacing.unit,
    marginBottom: spacing.unit,
  }
})

class KanbanColumn extends React.Component {
  state = {
    isAddNew: false,
    isAddCard: false,
    isShowToggleMenu: false,
    newColumnTitle: '',
    newCardContent: '',
  }
  _cardTextFieldRef = React.createRef();
  _toggleMenuRef = null;

  _handleAddColumnCancel(clearText = false) {
    this.setState({isAddNew: false});
    if(clearText) {
      this.setState({newColumnTitle: ''});
    }
  }

  _handleAddColumn() {
    const {
      newColumnTitle
    } = this.state;
    if(!newColumnTitle) {
      return;
    }

    this.props.onAddNew(newColumnTitle);
    this.setState({isAddNew: false});
  }

  _handleAddCard() {
    const {
      _id: cardColId,
    } = this.props.col;
    let content = this.state.newCardContent;
    console.log('新增内容:', cardColId, content);
    insertCard.call({
      content,
      cardColId,
    }, (err) => err && console.log('[insertCard error]', err));
    this._cardTextFieldRef && this._cardTextFieldRef.current.focus();
    this.setState({newCardContent: ''});
  }

  _handleAddCardCancel() {
    this.setState({newCardContent: '', isAddCard: false});
  }

  // 归档列
  _handleArchiveCol() {
    let colId = this.props.col._id;
    archiveCol.call({colId}, (err) => {
      this.setState({isShowToggleMenu: false});
      if (err) {
        console.error(err);
      }
    })
  }

  renderToggleMenu() {
    const {
      classes,
    } = this.props;

    return (
      <Popper
        className={classes.colToggleMenu}
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
                  <MenuItem onClick={() => this._handleArchiveCol()}>{__('kanban.archive')}</MenuItem>
                  <MenuItem onClick={() => console.log('aaaaa')}>My account</MenuItem>
                  <MenuItem onClick={() => console.log('aaaaa')}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    )
  }

  renderCardAdd() {
    const {
      classes,
    } = this.props;

    return this.state.isAddCard && (
      <div>
        <TextField
          InputProps={{className: classes.cardAddField}}
          inputProps={{ref: this._cardTextFieldRef}}
          placeholder="新增内容..."
          variant="outlined"
          autoFocus
          fullWidth
          multiline
          margin="normal"
          rows="2"
          rowsMax="4"
          value={this.state.newCardContent}
          onChange={(e) => this.setState({newCardContent: e.target.value})}
        />
        <div>
          <Button
            className={classes.cardAddBtn}
            onClick={() => this._handleAddCardCancel()}
          >取消</Button>
          <Button
            className={classes.cardAddBtn}
            color="primary"
            onClick={() => this._handleAddCard()}
          >新增</Button>
        </div>
      </div>
    );
  }

  renderCards(cards) {
    const {
      classes,
    } = this.props;

    return cards.filter(Boolean).map((card, index) => (
      <Draggable
        key={card._id}
        draggableId={card._id}
        index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classes.draggableCard}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            <CardItem cardId={card._id} cardContent={card.content} />
          </div>
        )}
      </Draggable>
    ))
  }

  renderColAdd() {
    const {
      classes,
    } = this.props;

    return (
      <ClickAwayListener onClickAway={() => this._handleAddColumnCancel()}>
        <Grow in={this.state.isAddNew}>
          <Paper className={classes.colAddGrow} elevation={4}>
            <TextField
              placeholder="输入列表标题..."
              fullWidth
              margin="none"
              value={this.state.newColumnTitle}
              onChange={e => this.setState({newColumnTitle: e.target.value})}
            />
            <Button onClick={() => this._handleAddColumn()}>添加列表</Button>
            <IconButton onClick={() => this._handleAddColumnCancel(true)}>
              <ClearIcon />
            </IconButton>
          </Paper>
        </Grow>
      </ClickAwayListener>
    )
  }

  render() {
    const {
      newCol = false,
      children,
      classes,
      col,
      cards,
    } = this.props;

    const gridProps = {
      item: true,
      xs: 12,
      sm: 3,
      lg: 2,
      className: classes.gridItem,
    }

    if(!newCol) {
      return (
        <Grid {...gridProps}>
          {children}
          <Droppable droppableId={col._id}>
            {
              (provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={classes.col}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <Grid
                    container
                    wrap="nowrap"
                    alignItems="center"
                  >
                    <Typography className={classes.colTitle} noWrap>{col.title}</Typography>
                    <Tooltip
                      title="添加"
                      placement="top-start"
                      className={classes.colActionBtn}
                      onClick={() => this.setState({isAddCard: !this.state.isAddCard})}
                    >
                      <AddIcon fontSize="small" />
                    </Tooltip>
                    <Tooltip
                      title="更多"
                      placement="top-start"
                      className={classes.colActionBtn}
                      onClick={(e) => {
                        this._toggleMenuRef = e.currentTarget;
                        this.setState({isShowToggleMenu: !this.state.isShowToggleMenu})
                      }}
                    >
                      <MoreHorizIcon fontSize="small" />
                    </Tooltip>
                    { this.renderToggleMenu() }
                  </Grid>
                  { this.renderCardAdd() }
                  { this.renderCards(cards) }
                  { provided.placeholder }
                </div>
              )
            }
          </Droppable>
        </Grid>
      )
    }else {
      return (
        <Grid {...gridProps}>
          <div className={classes.colAdd}>
            <Button style={{color: 'white'}} fullWidth onClick={() => this.setState({isAddNew: true})}>
              <AddIcon />
              <Typography noWrap color="inherit">添加另一个列表</Typography>
            </Button>
          </div>
          {this.state.isAddNew && this.renderColAdd()}
        </Grid>
      )
    }
  }
}

KanbanColumn.propTypes = {
  newCol: PropTypes.bool,
  col: PropTypes.object,
  cards: PropTypes.array,
};

export default withStyles(styles)(KanbanColumn);
