import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Card } from '../card.js';
import { Kanban } from '../../kanban/kanban.js';

Meteor.publishComposite('card.all', function({kanbanId}) {
  const { userId } = this;

  if(!userId) {
    return this.ready();
  }

  return {
    find() {
      const query = {
        _id: kanbanId,
        $or: [
          { userId },
          {
            members: userId
          }
        ]
      }

      return Kanban.find(query);
    },
    children: [{
      find(kanbanInfo) {
        let cols = kanbanInfo.cols;
        if(!cols) return this.ready();

        const query = {
          $or: cols.map(cardColId => ({cardColId}))
        };

        return Card.find(query);
      }
    }]
  }
})
