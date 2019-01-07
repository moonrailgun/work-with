import { Meteor } from 'meteor/meteor';
import { Team } from '../team.js';

Meteor.publish('team.all', function() {
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

  return Team.find(query)
});
