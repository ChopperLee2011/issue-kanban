'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    IssuesStore = require('./IssueStore'),
    PaginatedStoreUtils = require('../utils/PaginatedStoreUtils'),
    { createIndexedListStore, createListActionHandler } = PaginatedStoreUtils;

var IssuesByRepoStore = createIndexedListStore({
  getIssues(fullName) {
    return this.getIds(fullName).map(IssuesStore.get);
  }
});

var handleListAction = createListActionHandler({
  request: ActionTypes.REQUEST_STARRED_REPOS_PAGE,
  success: ActionTypes.REQUEST_STARRED_REPOS_PAGE_SUCCESS,
  error: ActionTypes.REQUEST_STARRED_REPOS_PAGE_ERROR,
});

AppDispatcher.register(function (payload) {
  AppDispatcher.waitFor([IssuesStore.dispatchToken]);

  var action = payload.action,
      login = action.login;

  if (login) {
    handleListAction(
      action,
      IssuesByRepoStore.getList(login),
      IssuesByRepoStore.emitChange
    );
  }
});

module.exports = IssuesByRepoStore;