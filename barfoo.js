'use strict';

var Model = require('./lib/Model');

var barfoo = {
  /*
   * models
   */
  models: {},
  createModel: function(opts) {
    return this.models[opts.name] = Model.extend(opts);
  },
  extendModel: function(model, opts) {
    return this.models[opts.name] = model.extend(opts);
  }
};

var Book = barfoo.createModel({
  attrs: {
    'name': 'string',
    'read': 'boolean'
  },
  // init: function() {
    // this.inspect();
  // }
});

var book = new Book({
  name: 'les 3 petits cochons'
});

var book2 = new Book({
  name: 'lol'
});

book2.read = true;

console.log(book.attrs)
console.log(book2.attrs)

// console.log(book === book2)
// console.log(book.attrs === book2.attrs)
// console.log(book.attrs.hash === book2.attrs.hash)
// console.log(book.attrs.ee === book2.attrs.ee)

// console.log(book.name, book2.name)