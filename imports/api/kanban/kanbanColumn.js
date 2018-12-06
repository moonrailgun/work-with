import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class Card {
  content: ''
}

class KanbanColumnCollection extends Mongo.Collection {

}

export const KanbanColumn = new KanbanColumnCollection('kanban_column');

KanbanColumn.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

KanbanColumn.schema = new SimpleSchema({
  title: {
    type: String
  },
  cards: {
    type: [String],
    defaultValue: [],
    regEx: SimpleSchema.RegEx.Id,
  },
  kanbanId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
  },
});

KanbanColumn.attachSchema(KanbanColumn.schema);
