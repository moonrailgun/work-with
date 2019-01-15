import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { KanbanColumn } from './kanbanColumn';
import { _ } from 'meteor/erasaur:meteor-lodash';

class KanbanCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    ourDoc.createdAt = ourDoc.createdAt || new Date();
    const result = super.insert(ourDoc, callback);
    return result;
  }

  remove(selector) {
    const kanbans = this.find(selector).fetch();
    const result = super.remove(selector);
    let or = _.flatten(kanbans.map(x => x.cols || [])).map(x => ({_id: x}));
    console.log('remove kanban column by', or);
    KanbanColumn.remove({$or: or});
    return result;
  }

  getNextSequenceValue(selector) {
    const res = this.update(selector, {
      $inc: {
        sequenceValue: 1,
      }
    })
    const kanban = this.findOne(selector);

    return kanban.sequenceValue;
  }
}

export const Kanban = new KanbanCollection('kanban');

Kanban.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Kanban.schema = new SimpleSchema({
  title: {
    type: String,
    max: 100,
  },
  members: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
  },
  visibility: {
    type: String,
    allowedValues: [
      'public',
      'team',
      'member',
    ],
    defaultValue: 'public',
  },
  cols: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    defaultValue: [],
  },
  archivedCards: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    defaultValue: [],
  },
  teamId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  // 看板所有人
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
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

Kanban.attachSchema(Kanban.schema);
Kanban.helpers({
  visibleBy(userId) {
    if(this.visibility === 'public') {
      return true;
    }else if(this.visibility === 'member') {
      return this.members.indexOf(userId) >= 0;
    }else if(this.visibility === 'team' && this.teamId) {
      // TODO: 待实现
      return false;
    }else {
      return false;
    }
  },
  // 只有看板成员可以进行编辑
  editableBy(userId) {
    return this.members.indexOf(userId) >= 0;
  },
  isManager(userId) {
    return this.userId === userId;
  },
})
