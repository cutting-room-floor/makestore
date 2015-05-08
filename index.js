'use strict';

var EventEmitter = require('events').EventEmitter;
var xtend = require('xtend');

/**
 * A helper function that extends a basic Flux store with a .listenTo
 * mixin and an addEventListener method that always uses the 'change' event.
 * @param {Object} store Flux store
 * @returns {Object} augmented store
 */
module.exports = function(opts) {
  var CHANGE_EVENT = 'change';
  var events = {
    emitChange: function(actionType, d) {
      this.emit(CHANGE_EVENT, actionType, d);
    },
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    listenTo: {
      componentWillMount: function() {
        store.addChangeListener(this._onChange);
      },
      componentWillUnmount: function() {
        store.removeChangeListener(this._onChange);
      }
    }
  };
  var store = xtend(EventEmitter.prototype, xtend(opts, events));
  return store;
};
