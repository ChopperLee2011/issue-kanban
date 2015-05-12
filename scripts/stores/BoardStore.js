'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
  {
    createStore, mergeIntoBag, isInBag
  } = require('../utils/StoreUtils');
var _ = require('lodash');
var _labels = {};

var LabelStore = createStore({
  contains(fullName, fields) {
      return isInBag(_labels, fullName, fields);
    },

    get(fullName) {
      return _labels[fullName];
    }
});
LabelStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action,
    response = action.response,
    // entities = response && response.entities,
    // fetchedIssues = entities && entities.issue;
    fetchedLabels = response && response.labels;
  if (fetchedLabels) {
    _labels = fetchedLabels;
    LabelStore.emitChange();
  }
});
// LabelStore.dispatchToken = AppDispatcher.register(function(payload) {
//   console.info('step 2 payload', payload);
//   var arrayIssue = [];
//   console.info('step 4 response',payload.action.response);
//   var action = payload.action,
//     fullName = action && action.fullName,
//     response = action.response,
//     // entities = response && response.entities,
//     // fetchedIssues = entities && entities.issue;
//     fetchedIssues = response;
//   if (fetchedIssues) {
//     // arrayIssue = Object.keys(fetchedIssues).map(function(key) {
//     //   return {
//     //     "type": key,
//     //     "name": fetchedIssues[key]
//     //   }
//     // })
//     // fetchedIssues[fullName] = arrayIssue
//     // mergeIntoBag(_labels, fetchedIssues[fullName]);
//     // console.log(arrayIssue);
//     // _labels[fullName] = arrayIssue
//     _labels[fullName] = fetchedIssues;
//     LabelStore.emitChange();
//   }
// });

module.exports = LabelStore;