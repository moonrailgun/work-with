import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class TeamCollection extends Mongo.Collection {

}

export const Team = new TeamCollection('Team');

Team.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
})

Team.schema = new SimpleSchema({
  name: {
    type: String,
    max: 100,
  },
  members: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
  },
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
  }
})

Team.attachSchema(Team.schema);
Team.helpers({
  
})
