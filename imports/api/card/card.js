import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class CardCollection extends Mongo.Collection {

}

export const Card = new CardCollection('cards');

Card.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Card.schema = new SimpleSchema({
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  assignTo: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  cardColId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  content: {
    type: String,
    max: 500,
  },
  tags: {
    type: [String],
    optional: true,
  },
  archived: {
    type: Boolean,
    defaultValue: false,
  },
  sequenceValue: {
    type: Number,
    defaultValue: 0,
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
  },
});

Card.attachSchema(Card.schema);
Card.helpers({

})
