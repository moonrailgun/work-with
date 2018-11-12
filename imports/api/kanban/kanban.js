import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class KanbanCollection extends Mongo.Collection {

}

export const Kanban = new KanbanCollection('Kanban');

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
  createdAt: {
    type: Date,
    // denyUpdate: true,
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
})
