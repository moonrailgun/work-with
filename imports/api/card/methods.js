import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/erasaur:meteor-lodash';

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
      createdAt: new Date(),
    });

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

const ALLOW_METHODS = _.map([
  insert,
  assign,
], 'name');

if(Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.includes(ALLOW_METHODS, name);
    },

    connectionId() { return true; }
  }, 5, 1000);
}
