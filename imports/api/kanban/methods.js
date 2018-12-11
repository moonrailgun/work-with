import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/erasaur:meteor-lodash';

import { Kanban } from './kanban';
import { KanbanColumn } from './kanbanColumn';
import { Card } from '../card/card';

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
  run({ title, visibility, template = 'base' }) {
    let userId = this.userId;

    let kanbanId = Kanban.insert({
      title,
      userId,
      members: [userId],
      visibility,
    });

    let defaultCols = [];
    if(template === 'base') {
      defaultCols = ['待处理', '处理中', '已完成'];
    }

    let cols = defaultCols.map((n) => {
      return KanbanColumn.insert({title: n, kanbanId});
    })
    Kanban.update(kanbanId, {
      $set: {cols: cols}
    });

    return kanbanId;
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
    const newColId = KanbanColumn.insert({
      title,
      kanbanId,
    })

    return Kanban.update(kanbanId, {
      $push: {cols: newColId},
    })
  }
})

export const moveCard = new ValidatedMethod({
  name: 'kanban.moveCard',
  validate: new SimpleSchema({
    cardId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    fromColId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    toColId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    fromIndex: {
      type: Number,
    },
    toIndex: {
      type: Number,
    },
  }).validator(),
  run({cardId, fromColId, toColId, fromIndex, toIndex}) {
    const cardInfo = Card.findOne(cardId);
    if(!cardInfo) {
      // 没有找到卡片
      throw new Meteor.Error(
        'api.kanban.moveCard.cardNotFound',
        'Card not found',
      );
    }

    if(cardInfo.cardColId !== fromColId) {
      // 卡片已经被移动
      throw new Meteor.Error(
        'api.kanban.moveCard.cardHasBeenMoved',
        'Card has been moved',
      );
    }

    Card.update(cardId, {
      $set: {
        cardColId: toColId,
      }
    })

    KanbanColumn.update(fromColId, {
      $pull: {
        cards: cardId,
      }
    })

    KanbanColumn.update(toColId, {
      $push: {
        cards: {
          $each: [ cardId ],
          $position: toIndex,
        }
      }
    })
  }
})

export const archiveCol = new ValidatedMethod({
  name: 'kanban.archiveCol',
  validate: new SimpleSchema({
    colId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    }
  }).validator(),
  run({colId}) {
    const col = KanbanColumn.findOne(colId);
    const {
      cards,
      kanbanId,
    } = col;
    KanbanColumn.update(colId, {
      $set: {
        cards: []
      }
    })

    return Kanban.update(kanbanId, {
      $push: {
        archivedCards: cards
      }
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
