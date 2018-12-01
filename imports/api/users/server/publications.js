import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Kanban } from '../../kanban/kanban.js';

Meteor.publishComposite('user.kanban.all', function({kanbanId}) {
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
        let members = kanbanInfo.members;
        if(!members) return this.ready();

        const query = {
          _id: { $in: members }
        };

        return Meteor.users.find(query);
      }
    }]
  }
})
