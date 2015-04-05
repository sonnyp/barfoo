'use strict';

var EventEmitter = function() {
  Object.defineProperties(this, {
    'events': {
      configurable: false,
      enumerable: false,
      writable: false,
      value: {}
    },
    'lastId': {
      configurable: false,
      enumerable: false,
      writable: true,
      value: 0
    }
  });
};

EventEmitter.prototype.once = function(event, fn) {
  var that = this;

  var listener = function(arg) {
    that.off(event, this);
    fn(arg);
  };
  this.on(event, listener);
};

EventEmitter.prototype.on = function(event, fn) {
  if (!this.events[event])
    this.events[event] = {};

  var events = this.events[event];

  events[this.lastId++] = fn;
};

EventEmitter.prototype.off = function(event, fn) {
  var events = this.events[event];
  if (!events)
    return;

  var keys = Object.keys(events);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var listener = events[key];
    if (listener !== fn)
      continue;

    delete events[key];
    break;
  }
};

EventEmitter.prototype.emit = function(event, arg) {
  var events = this.events[event];
  if (!events)
    return;

  for (var i in events)
    events[i](arg);
};

module.exports = EventEmitter;
