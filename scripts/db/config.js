'use strict';
var PouchDB = require('pouchdb');

var pouch = new PouchDB('issue');
var remoteCouch = 'http://localhost:5984/issue';
var db = {
  sync() {
    var opts = {
      live: true
    };
    pouch.replicate.to(remoteCouch, opts);
    pouch.replicate.from(remoteCouch, opts);
  }
}

module.exports = db;