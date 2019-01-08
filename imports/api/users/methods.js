import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/erasaur:meteor-lodash';

export const userInfoSchema = new SimpleSchema({
  avatar: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
})

export const updateInfo = new ValidatedMethod({
  name: 'user.info.update',
  validate: new SimpleSchema({
    info: {
      type: userInfoSchema,
    },
  }).validator(),
  run({info}) {
    let userInfo = Meteor.users.findOne(this.userId);
    return Meteor.users.update(this.userId, {
      $set: {
        info: Object.assign({}, userInfo.info, info),
      }
    });
  }
})

const ALLOW_METHODS = _.map([
  updateInfo,
], 'name');

if(Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.includes(ALLOW_METHODS, name);
    },

    connectionId() { return true; }
  }, 5, 1000);
}
