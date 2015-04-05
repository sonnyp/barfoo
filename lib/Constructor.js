'use strict';

var util = require('util');

var help = require('./helpers');

var Constructor = function() {
};

Constructor._extend = function(options) {
  options = options || {};

  var that = this;

  var Extended = function() {
    that.call(this);
    if (options.init)
      options.init.apply(this, arguments);
  };
  util.inherits(Extended, this);


  if (options.proto)
    help.setProperties(Extended.prototype, options.proto)

  Object.keys(this).forEach(function(key) {
    if (key !== 'super_') {
      Extended[key] = that[key];
    }
  });

  if (options.static)
    help.setProperties(Extended, options.static)

  return Extended;
};

module.exports = Constructor;


