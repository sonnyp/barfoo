'use strict';

module.exports.each = function(obj, fn) {
  if (Array.isArray(obj)) {
    obj.forEach(function(idx, item) {
      fn(idx, item)
    });
    return;
  };

  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach(function(key) {
      fn(key, obj[key]);
    });
    return;
  }
};

/*
 * http://json-schema.org/latest/json-schema-core.html#anchor8
 */
module.exports.type = function(obj) {
  if (Array.isArray(obj)) return 'array';

  if (obj === null) return 'null';

  return typeof obj;
};

module.exports.setProperties = function(obj, props) {
  for (var i in props) {
    if (typeof props[i] === 'object' && props[i] !== null)
      Object.defineProperty(obj, i, props[i]);
    else
      obj[i] = props[i];
  }
};
