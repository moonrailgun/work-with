import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Kanban } from '/imports/api/kanban/kanban';
import { KanbanColumn } from '/imports/api/kanban/kanbanColumn';
import { Card } from '/imports/api/card/card';
import KanbanContainer from '/imports/ui/components/KanbanContainer';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  kanbanContainer: {
    flex: 1,
  }
})

class KanbanRoute extends React.Component {
  render() {
    const {
      match,
      classes,
      kanbanInfo,
      kanbanCols,
      kanbanCards,
    } = this.props;
    const { kanbanId } = match.params;

    return (
      <div className={classes.root}>
        <div><h3>{kanbanInfo.title}</h3></div>
        <div className={classes.kanbanContainer}>
          <KanbanContainer kanbanId={kanbanId} kanbanCols={kanbanCols} kanbanCards={kanbanCards} />
        </div>
      </div>
    )
  }
}

const route = withTracker(({match}) => {
  const kanbanId = match.params.kanbanId;
  const allKanbanHandler = Meteor.subscribe('kanban.all');
  const allKanbanColsHandler = Meteor.subscribe('kanban.cols.all', { kanbanId });
  const allCardHandler = Meteor.subscribe('card.all', { kanbanId });
  const kanbanInfo = Kanban.find(kanbanId).fetch()[0] || {};
  let kanbanCols = [];
  let kanbanCards = [];
  if(kanbanInfo && kanbanInfo.cols) {
    let cols = kanbanInfo.cols || [];
    kanbanCols = KanbanColumn.find({
      _id: {
        $in: cols
      }
    }).fetch();
    kanbanCards = Card.find({
      cardColId: {
        $in: cols
      }
    }).fetch();
  }
  return {
    loading: !allKanbanHandler.ready() || !allKanbanColsHandler.ready() || !allCardHandler.ready(),
    kanbanInfo,
    kanbanCols,
    kanbanCards,
  }
})(KanbanRoute)

export default withStyles(styles)(route);
