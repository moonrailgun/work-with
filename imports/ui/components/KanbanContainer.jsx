import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const getListStyle = isDraggingOver => ({
  // outline: isDraggingOver ? 1 : 0,
});

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,
});

const styles = ({shape, spacing, palette, shadows}) => ({
  root: {
    padding: spacing.unit,
    overflow: 'auto',
  },
  gridItem: {
    flexShrink: 0,
  },
  col: {
    borderRadius: shape.borderRadius,
    padding: spacing.unit,
    backgroundColor: '#dfe3e6',
    boxShadow: shadows[2],
  },
  colAdd: {
    padding: 0,
    backgroundColor: 'rgba(0,0,0,.24)',
    color: palette.common.white,
  },
  card: {
    borderRadius: shape.borderRadius,
    marginBottom: spacing.unit,
    padding: spacing.unit * 2,
    userSelect: 'none',
    backgroundColor: palette.common.white,
    boxShadow: 'none',
    '&:hover, &:active': {
      boxShadow: shadows[1],
    }
  }
})

class KanbanContainer extends React.Component {
  state = {
    cols: [{
      _id: '1',
      title: 'TODO',
      cards: [{
        _id: "123",
        content: 'test11231'
      }]
    }, {
      _id: '122',
      title: '处理中',
      cards: [{
        _id: "12314",
        content: '1eede'
      }]
    }, {
      _id: '1221dd',
      title: '处理中1',
      cards: [{
        _id: "123149",
        content: '1eeacde'
      }]
    }, {
      _id: '12222',
      title: '处理中2',
      cards: [{
        _id: "12314qq",
        content: '1ewdede'
      }]
    }, {
      _id: '22',
      title: 'DONE',
      cards: [{
        _id: "1234",
        content: 'uudd'
      }]
    }]
  }

  _handleDropEnd(result) {
    const { source, destination } = result;
    if(!destination) {
      return;
    }

    console.log('source, destination', source, destination);
  }

  _handleAddCol() {
    console.log('TODO: 增加新列');
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

  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} wrap={'nowrap'}>
          <DragDropContext onDragEnd={(res) => this._handleDropEnd(res)}>
            {
              this.state.cols.map((col, index) => (
                <Grid item key={col._id} xs={12} sm={3} md={2} className={classes.gridItem}>
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
              ))
            }
            <Grid item xs={12} sm={3} md={2} className={classes.gridItem}>
              <div className={classNames(classes.col, classes.colAdd)}>
                <Button fullWidth onClick={() => this._handleAddCol()}><AddIcon />添加另一个列表</Button>
              </div>
            </Grid>
          </DragDropContext>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(KanbanContainer);
