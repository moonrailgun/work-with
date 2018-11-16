import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Kanban } from '../../api/kanban/kanban';
import { insert } from '../../api/kanban/methods';

class Dashboard extends React.Component {
  _handleCreateKanban() {
    const kanbanId = insert.call({
      title: 'Kanban#' + String(Math.random()),
      visibility: 'public',
    }, (err) => {
      if(err) {
        console.error('err', err);
      }
    })

    console.log('kanbanId', kanbanId);
  }

  render() {
    return (
      <div>
        <p>
          {JSON.stringify(this.props.userId)}
        </p>
        <p>
          {JSON.stringify(this.props.kanbanList)}
        </p>
        <button onClick={() => this._handleCreateKanban()}>创建看板</button>
      </div>
    )
  }
}

console.log('Kanban', Kanban);

export default withTracker(() => {
  const allKanbanHandler = Meteor.subscribe('kanban.all');

  let userId = Meteor.userId();
  return {
    userId,
    loading: !allKanbanHandler.ready(),
    kanbanList: Kanban.find({
      $or: [
        { userId: userId },
        { members: userId }
      ]
    }).fetch(),
  }
})(Dashboard);
