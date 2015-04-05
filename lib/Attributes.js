'use strict';

var util = require('util');

var help = require('./helpers');
var EventEmitter = require('./EventEmitter');
var Constructor = require('./Constructor');

var Attributes = Constructor._extend({
  init: function(attrs) {
    this.hash = {};
    this.ee = new EventEmitter();
    for (var i in this.types) {
      if (attrs && i in attrs)
        this.hash[i] = attrs[i];
      else
        this.hash[i] = undefined
    }
  },

  static: {
    extend: function(props) {
      var Attrs = function(attrs) {
        Attributes.call(this, attrs);
      };
      util.inherits(Attrs, Attributes);

      var types = {};
      for (var i in props) {
        types[i] = props[i];
      }
      Attrs.prototype.types = types;

      var define = {};
      for (var i in props) {
        define[i] = {
          enumerable: true,
          get: function() {
            return this.get(i);
          },
          set: function(value) {
            return this.set(i, value);
          }
        }
      }

      // helpe.setProperties(Attrs.prototype, define);

      Object.defineProperties(Attrs.prototype, define);

      return Attrs;
    }
  },

  proto: {
    has: {
      value: function(name) {
        return this.hash[name] !== undefined;
      }
    },
    get: {
      value: function(name) {
        return this.hash[name];
      }
    },
    set: {
      value: function(name, value) {
        if (this.hash[name] === value)
          return;

        if (value === undefined)
          return this.del(value);

        if (help.type(value) !== this.types[name])
          throw new TypeError('Attribute "' + name + '" must be of type "' + this.types[name] + '"');

        this.hash[name] = value;
        this.ee.emit(name, value);
      }
    },
    del: {
      value: function(name) {
        if (this.hash[name] === undefined)
          return;

        this.hash[name] = undefined;
        this.ee.emit(name, undefined);
      }
    },
    on: {
      value: function(name, fn) {
        return this.ee.on(name, fm);
      }
    },
    once: {
      value: function(name, fn) {
        return this.ee.once(name, fn);
      }
    },
    off: {
      value: function(name, fn) {
        return this.ee.off(name, fn);
      }
    },
  }
});

module.exports = Attributes;
