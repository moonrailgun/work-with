import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import classNames from 'classnames';
import KanbanColumn from './KanbanColumn';
import { addKanbanColumn } from '/imports/api/kanban/methods';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = ({shape, spacing, palette, shadows}) => ({
  root: {
    padding: spacing.unit,
    overflow: 'auto',
    height: '100%',
    width: '100%',
  },
})

class KanbanContainer extends React.Component {
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

  render() {
    const {
      classes,
      kanbanCols,
      kanbanCards,
    } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={16} wrap={'nowrap'}>
          <DragDropContext onDragEnd={(res) => this._handleDropEnd(res)}>
            {
              kanbanCols.map((col, index) => (
                <KanbanColumn key={col._id} col={col} cards={col.cards.map(cardId => kanbanCards.find(c => c._id === cardId))} />
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
  kanbanCols: PropTypes.array,
  kanbanCards: PropTypes.array
};

export default withStyles(styles)(KanbanContainer);
