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
        {JSON.stringify(this.props.allKanban)}
      </div>
    )
  }
}

export default withTracker(({match}) => {
  const kanbanId = match.params.kanbanId;
  return {
    allKanban: Meteor.subscribe('kanban.all'),
  }
})(KanbanContainer);
