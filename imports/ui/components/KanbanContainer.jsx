import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import classNames from 'classnames';
import KanbanColumn from './KanbanColumn';
import { addKanbanColumn } from '/imports/api/kanban/methods';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    height: '100%',
    width: '100%',
  },
  col: {
    borderRadius: shape.borderRadius,
    padding: spacing.unit,
    backgroundColor: '#dfe3e6',
    boxShadow: shadows[2],
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

  _handleAddCol(title) {
    const {
      kanbanId,
    } = this.props;

    addKanbanColumn.call({ title, kanbanId }, (err) => {
      if(err) {
        console.error('新增失败', err);
      }
    })
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
                <KanbanColumn key={col._id}>
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
                </KanbanColumn>
              ))
            }
            <KanbanColumn newCol onAddNew={(title) => this._handleAddCol(title)} />
          </DragDropContext>
        </Grid>
      </div>
    )
  }
}

KanbanContainer.propTypes = {
  kanbanId: PropTypes.string.isRequired,
};

export default withStyles(styles)(KanbanContainer);
