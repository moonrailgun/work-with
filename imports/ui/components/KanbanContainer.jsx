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
                <KanbanColumn key={col._id} col={col} cards={kanbanCards.filter(c => c.cardColId === col._id)} />
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
