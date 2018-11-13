import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class CardCollection extends Mongo.Collection {

}

export const Card = new CardCollection('Card');

Card.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Card.schema = new SimpleSchema({
  creator: {
    type: String,
    regEx: SimpleSchema.RegEx.id,
  },
  assignTo: {
    type: String,
    regEx: SimpleSchema.RegEx.id,
    optional: true,
  },
  content: {
    type: String,
    max: 500,
  },
  tags: {
    type: [String],
    optional: true,
  },
  createdAt: {
    type: Date,
  },
})

Card.attachSchema(Card.schema);
Card.helpers({

})
