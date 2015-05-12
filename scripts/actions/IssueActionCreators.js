'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    RepoAPI = require('../utils/RepoAPI'),
    PouchService= require('../utils/PouchService'),
    LabelStore = require('../stores/LabelStore');

var RepoActionCreators = {
  requestRepo(fullName, fields) {
    if (RepoStore.contains(fullName, fields)) {
      return;
    }
    
    // Although this action is currently not handled by any store,
    // it is fired for consistency. You might want to use it later,
    // e.g. to show a spinner or have a more detailed log.

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_REPO,
      fullName: fullName
    });
    RepoAPI.requestRepo(fullName);
  },

  requestIssue(fullName) {

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_LABEL,
      fullName: fullName
    });
    PouchService.sync(fullName);

    PouchService.requestLabel(fullName);
  }
};

module.exports = RepoActionCreators;
