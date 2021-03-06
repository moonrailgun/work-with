import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import classNames from 'classnames';
import KanbanColumn from './KanbanColumn';
import { addKanbanColumn, moveCard } from '/imports/api/kanban/methods';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  padding: ${props => props.theme.spacing.unit}px;
  overflow: hidden;
  flex: 1;
  width: 100%;
  height: 100%;

  > div {
    height: 100%;
  }
`

class KanbanContainer extends React.Component {
  _handleDropEnd(result) {
    const { source, destination, draggableId: cardId } = result;
    if(!destination) {
      return;
    }

    const {
      droppableId: fromColId,
      index: fromIndex,
    } = source;
    const {
      droppableId: toColId,
      index: toIndex,
    } = destination;

    const pkg = {
      cardId,
      fromColId,
      fromIndex,
      toColId,
      toIndex,
    };

    console.log('move card', pkg);
    moveCard.call(pkg, err => {
      if(err) {
        console.log(err);
      }
    });
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

  onCardClicked(cardId) {
    this.props.onChangeCardDetail && this.props.onChangeCardDetail(cardId);
  }

  render() {
    const {
      classes,
      kanbanCols,
      kanbanCards,
    } = this.props;

    return (
      <Container>
        <Grid container spacing={16} wrap={'nowrap'}>
          <DragDropContext onDragEnd={(res) => this._handleDropEnd(res)}>
            {
              kanbanCols.map((col, index) => (
                <KanbanColumn
                  key={col._id}
                  col={col}
                  cards={col.cards.map(cardId => kanbanCards.find(c => c._id === cardId))}
                  onCardClicked={cardId => this.onCardClicked(cardId)}
                />
              ))
            }
            <KanbanColumn newCol onAddNew={(title) => this._handleAddCol(title)} />
          </DragDropContext>
        </Grid>
      </Container>
    )
  }
}

KanbanContainer.propTypes = {
  kanbanId: PropTypes.string.isRequired,
  kanbanCols: PropTypes.array,
  kanbanCards: PropTypes.array,
  onChangeCardDetail: PropTypes.func,
};

export default KanbanContainer;
