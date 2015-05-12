'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    PouchService = require('../utils/PouchService');

var RepoActionCreators = {
    requestRepoList(){
        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_REPO_LIST
        });
    },

    requestIssue(fullName) {

        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_ISSUES,
            fullName: fullName
        });
        // PouchService.syncDb(fullName);
        // PouchService.requestBoard(fullName);
    },
    
    requestLabel(fullName) {

        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_LABELS,
            fullName: fullName
        });
        PouchService.requestLabel(fullName);
    }


    // requestReposPage(login, isInitialRequest) {
    //   if (StarredReposByUserStore.isExpectingPage(login) ||
    //       StarredReposByUserStore.isLastPage(login)) {
    //     return;
    //   }

    //   if (isInitialRequest && StarredReposByUserStore.getPageCount(login) > 0) {
    //     return;
    //   }

    //   AppDispatcher.handleViewAction({
    //     type: ActionTypes.REQUEST_STARRED_REPOS_PAGE,
    //     login: login
    //   });

    //   var nextPageUrl = StarredReposByUserStore.getNextPageUrl(login);
    //   RepoAPI.requestReposPage(login, nextPageUrl);
    // }
};

module.exports = RepoActionCreators;