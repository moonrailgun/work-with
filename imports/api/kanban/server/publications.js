import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Kanban } from '../kanban.js';
import { KanbanColumn } from '../kanbanColumn.js';

Meteor.publish('kanban.all', function() {
  const { userId } = this;

  if(!userId) {
    return this.ready();
  }

  const query = {
    $or: [
      { userId },
      {
        members: userId
      }
    ]
  }

  return Kanban.find(query)
});

// TODO: 可能需要处理一些权限的问题
Meteor.publish('kanban.cols.all', function({ kanbanId }) {
  const { userId } = this;

  if(!userId) {
    return this.ready();
  }

  const query = {
    kanbanId,
  }

  return KanbanColumn.find(query);
});
