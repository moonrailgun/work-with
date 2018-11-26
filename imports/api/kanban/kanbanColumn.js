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
    type: [Card],
    defaultValue: [],
  },
  kanbanId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
});

KanbanColumn.attachSchema(KanbanColumn.schema);
