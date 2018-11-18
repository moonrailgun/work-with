import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Kanban } from '/imports/api/kanban/kanban';

class KanbanContainer extends React.Component {
  render() {
    const {
      params
    } = this.props.match;
    const { kanbanId } = params;
    return (
      <div>
        当前看板信息:
        {JSON.stringify(this.props.kanbanInfo)}
      </div>
    )
  }
}

console.log('kanban', Kanban);

export default withTracker(({match}) => {
  const kanbanId = match.params.kanbanId;
  const allKanbanHandler = Meteor.subscribe('kanban.all')
  return {
    loading: !allKanbanHandler.ready(),
    kanbanInfo: Kanban.find(kanbanId).fetch()[0],
  }
})(KanbanContainer);
