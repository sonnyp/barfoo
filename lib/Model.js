'use strict';

var util = require('util');

var help = require('./helpers');
var Attributes = require('./Attributes');
var Constructor = require('./Constructor');

var Model = Constructor._extend({
  init: function() {
    id: ''
  },
  static: {
    extend: function(opts) {
      var attrs = opts.attrs || {};
      var methods = opts.methods || {};

      var Attrs = Attributes.extend(attrs);
      var Extended = this._extend({
        init: function(attrs) {
          this.attrs = new Attrs(attrs);
        }
      });

      //attrs
      var define = {};
      for (var i in opts.attrs) {
        define[i] = (function(name) {
          return {
            enumerable: true,
            get: function() {
              return this.attrs.get(name);
            },
            set: function(value) {
              return this.attrs.set(name, value);
            }
          }
        }(i))
      }
      help.setProperties(Extended.prototype, define);

      //methods
      help.setProperties(Extended.prototype, methods);

      return Extended;
    },
  },
  proto: {
    has: function(name) {
      return this.attrs.has(name);
    },
    get: function(name) {
      return this.attrs.get(name);
    },
    set: function(name, value) {
      return this.attrs.set(name, value);
    },
    del: function(name) {
      return this.attrs.del(name);
    }
  }
});

module.exports = Model;
