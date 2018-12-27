import { Meteor } from 'meteor/meteor';
import { Avatar } from '../avatar';

Meteor.publish('files.avatar.all', function () {
  return Avatar.find().cursor;
});
