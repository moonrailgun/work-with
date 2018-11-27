import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Kanban } from '/imports/api/kanban/kanban';
import { KanbanColumn } from '/imports/api/kanban/kanbanColumn';
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
    } = this.props;
    const { kanbanId } = match.params;
    const { kanbanInfo } = this.props;

    return (
      <div className={classes.root}>
        当前看板信息:
        {JSON.stringify(this.props.kanbanInfo)}
        {JSON.stringify(this.props.kanbanCols)}
        <div className={classes.kanbanContainer}>
          <KanbanContainer kanbanId={kanbanId} />
        </div>
      </div>
    )
  }
}

const route = withTracker(({match}) => {
  const kanbanId = match.params.kanbanId;
  const allKanbanHandler = Meteor.subscribe('kanban.all');
  const allKanbanColsHandler = Meteor.subscribe('kanban.cols.all', { kanbanId });
  const kanbanInfo = Kanban.find(kanbanId).fetch()[0];
  let kanbanCols = [];
  if(kanbanInfo && kanbanInfo.cols) {
    // 这里有个排序
    kanbanCols = KanbanColumn.find({
      $or: kanbanInfo.cols.map(_id => ({_id}))
    }).fetch();
  }
  return {
    loading: !allKanbanHandler.ready() || !allKanbanColsHandler.ready(),
    kanbanInfo,
    kanbanCols,
  }
})(KanbanRoute)

export default withStyles(styles)(route);
