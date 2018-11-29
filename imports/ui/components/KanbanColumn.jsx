import React from 'react';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const getListStyle = isDraggingOver => ({
  // outline: isDraggingOver ? 1 : 0,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
});

const styles = ({shape, spacing, shadows, palette}) => ({
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
  },
})

class KanbanColumn extends React.Component {
  state = {
    isAddNew: false,
    newColumnTitle: '',
  }

  _handleCancelAdd(clearText = false) {
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

  renderCards(cards) {
    const {
      classes,
    } = this.props;

    return cards.map((card, index) => (
      <Draggable
        key={card._id}
        draggableId={card._id}
        index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={classes.card}
            style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
            )}
          >
            {card.content}
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
      <ClickAwayListener onClickAway={() => this._handleCancelAdd()}>
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
            <IconButton onClick={() => this._handleCancelAdd(true)}>
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
    } = this.props;

    const gridProps = {
      item: true,
      xs: 12,
      sm: 3,
      md: 2,
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
                  <Typography gutterBottom>{col.title}</Typography>
                  { this.renderCards(col.cards) }
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
};

export default withStyles(styles)(KanbanColumn);
