import { Meteor } from 'meteor/meteor';
import { Logger } from 'meteor/ostrio:logger';
import { LoggerMongo } from 'meteor/ostrio:loggermongo';

const log = new Logger();
new LoggerMongo(log).enable();

if(Meteor.isClient) {
  const _GlobalErrorHandler = window.onerror;

  window.onerror = (msg, url, line) => {
    log.error(msg, {file: url, onLine: line});
    if (_GlobalErrorHandler) {
      _GlobalErrorHandler.apply(this, arguments);
    }
  };
}

if(Meteor.isServer) {
  const bound = Meteor.bindEnvironment((callback) => {callback();});
  process.on('uncaughtException', function (err) {
    bound(() => {
      log.error("Server Crashed!", err);
      console.error(err.stack);
      process.exit(7);
    });
  });

  const originalMeteorDebug = Meteor._debug;
  Meteor._debug = (message, stack) => {
    const error = new Error(message);
    error.stack = stack;
    log.error('Meteor Error!', error);
    return originalMeteorDebug.apply(this, arguments);
  }
}
