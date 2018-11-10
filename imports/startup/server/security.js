import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/erasaur:meteor-lodash';

Meteor.users.deny({
  update() {
    return true;
  },
});

const AUTH_METHODS = [
  'login',
  'logout',
];

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(AUTH_METHODS, name);
    },

    connectionId() { return true; },
  }, 2, 5000);
}
