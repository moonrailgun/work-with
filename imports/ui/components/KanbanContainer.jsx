import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Grid from '@material-ui/core/Grid';

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

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
      _id: '22',
      title: 'DONE',
      cards: [{
        _id: "1234",
        content: 'uudd'
      }]
    }]
  }

  renderCards(cards) {
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
    return (
      <DragDropContext>
        <Grid container spacing={16}>
          {
            this.state.cols.map((col, index) => (
              <Grid item key={col._id}>
                <Droppable droppableId={col._id}>
                  {
                    (provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        { this.renderCards(col.cards) }
                        { provided.placeholder }
                      </div>
                    )
                  }
                </Droppable>
              </Grid>
            ))
          }
        </Grid>
      </DragDropContext>
    )
  }
}

export default KanbanContainer;
