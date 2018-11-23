import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Kanban } from '/imports/api/kanban/kanban';
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

    return (
      <div className={classes.root}>
        当前看板信息:
        {JSON.stringify(this.props.kanbanInfo)}
        <div className={classes.kanbanContainer}>
          <KanbanContainer />
        </div>
      </div>
    )
  }
}

console.log('kanban', Kanban);

const route = withTracker(({match}) => {
  const kanbanId = match.params.kanbanId;
  const allKanbanHandler = Meteor.subscribe('kanban.all')
  return {
    loading: !allKanbanHandler.ready(),
    kanbanInfo: Kanban.find(kanbanId).fetch()[0],
  }
})(KanbanRoute)

export default withStyles(styles)(route);
