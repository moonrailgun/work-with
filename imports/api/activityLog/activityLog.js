import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ActivityLogCollection extends Mongo.Collection {

}

export ActivityLog = new ActivityLogCollection('activity_log');

ActivityLog.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});


Card.schema = new SimpleSchema({
  kanbanId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  operatorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  funcName: {
    type: String,
    optional: true,
  },
  extraId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  message: {
    type: String,
    optional: true,
  },
  extraData: {
    type: Object,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
  },
});

Card.attachSchema(Card.schema);
