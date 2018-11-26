import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/erasaur:meteor-lodash';

import { Kanban } from './kanban';
import { KanbanColumn } from './kanbanColumn';

export const insert = new ValidatedMethod({
  name: 'kanban.insert',
  validate: new SimpleSchema({
    title: {
      type: String,
    },
    visibility: {
      type: String,
      allowedValues: [
        'public',
        'team',
        'member',
      ],
    }
  }).validator(),
  run({ title, visibility }) {
    let userId = this.userId;

    return Kanban.insert({
      title,
      userId,
      members: [userId],
      visibility,
      createdAt: new Date(),
    })
  }
})

export const addKanbanColumn = new ValidatedMethod({
  name: 'kanban.insertColumn',
  validate: new SimpleSchema({
    title: {
      type: String,
    },
    kanbanId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    }
  }).validator(),
  run({title, kanbanId}) {
    console.log(title, kanbanId);

    const newColId = KanbanColumn.insert({
      title,
      kanbanId,
    })

    return Kanban.update(kanbanId, {
      $push: {cols: newColId},
    })
  }
})

const ALLOW_METHODS = _.map([
  insert,
  addKanbanColumn,
], 'name');

if(Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.includes(ALLOW_METHODS, name);
    },

    connectionId() { return true; }
  }, 5, 1000);
}
