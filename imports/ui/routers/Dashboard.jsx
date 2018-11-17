import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Kanban } from '../../api/kanban/kanban';
import { insert } from '../../api/kanban/methods';
import KanbanItem from '../components/KanbanItem';

import Grid from '@material-ui/core/Grid';

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

  _handleClickKanbanItem(kanbanId) {
    console.log('打开看板', kanbanId);
  }

  render() {
    const {
      userId,
      kanbanList,
    } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} md={8}>
          <div>
            <p>我的看板</p>
            <Grid container spacing={16}>
              {
                kanbanList.filter((item) => item.userId === userId).map(item => {
                  return (
                    <Grid key={item._id} item xs={3}>
                      <KanbanItem title={item.title} onClick={() => this._handleClickKanbanItem(item._id)} />
                    </Grid>
                  )
                })
              }
              <Grid item xs={3}>
                <KanbanItem isNew onClick={() => this._handleCreateKanban()} />
              </Grid>
            </Grid>
            <p>团队看板</p>
          </div>
        </Grid>
      </Grid>

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
