import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Kanban } from '/imports/api/kanban/kanban';

class KanbanContainer extends React.Component {
  render() {
    return (
      <div>
        当前看板信息:
        {JSON.stringify(this.props.kanban)}
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    kanban: Kanban.findOne(),
  }
})(KanbanContainer);
