import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/erasaur:meteor-lodash';

import { Kanban } from '../kanban/kanban';
import { KanbanColumn } from '../kanban/kanbanColumn';
import { Card } from './card';

export const insert = new ValidatedMethod({
  name: 'card.insert',
  validate: new SimpleSchema({
    content: {
      type: String,
    },
    cardColId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    }
  }).validator(),
  run({content, cardColId}) {
    let userId = this.userId;

    const cardId = Card.insert({
      creator: userId,
      cardColId,
      content,
    });

    KanbanColumn.update(cardColId, {
      $push: {
        cards: {
          $each: [cardId],
          $position: 0,
        }
      }
    })

    return cardId;
  },
})

export const assign = new ValidatedMethod({
  name: 'card.assign',
  validate: new SimpleSchema({
    cardId:{
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    assignTo:{
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    }
  }).validator(),
  run({cardId, assignTo}) {
    return Card.update(cardId, {
      $set: {
        assignTo,
      }
    })
  }
})

export const remove = new ValidatedMethod({
  name: 'card.remove',
  validate: new SimpleSchema({
    cardId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    }
  }).validator(),
  run({cardId}) {
    const card = Card.findOne(cardId);
    const col = KanbanColumn.findOne(card.cardColId);
    const kanban = Kanban.findOne(col.kanbanId);
    const userId = this.userId;
    if(!userId.includes(kanban.members)) {
      throw new Meteor.Error(
        'api.card.remove.accessDenied',
        'Not a member of this kanban',
      );
    }

    KanbanColumn.update(col._id, {
      $pull: {
        cards: cardId,
      }
    });

    return Card.remove(cardId);
  }
})

const ALLOW_METHODS = _.map([
  insert,
  assign,
  remove,
], 'name');

if(Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.includes(ALLOW_METHODS, name);
    },

    connectionId() { return true; }
  }, 5, 1000);
}
