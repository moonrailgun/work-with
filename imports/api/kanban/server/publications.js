import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Kanban } from '../kanban.js';

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
