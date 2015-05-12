'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),

    {
        createStore, mergeIntoBag, isInBag
        } = require('../utils/StoreUtils');

var _boards = {};
var _repos = {};

var ListStore = createStore({
    get() {
        return {
            boards: _boards,
            repos: _repos
        };
    }
});

ListStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action,
        response = action.response,
        fetchedBoards = response && response.boards,
        fetchedRepos = response && response.repos;
    if (fetchedBoards && action.type === 'REQUEST_BOARD_LIST_SUCCESS') {
        _boards = fetchedBoards;
        _repos = response.login.repos.filter(function (repo) {
            return repo.fork == false;
        });
        ListStore.emitChange();
    }
    //TODO: merge it in to fetchedBoards
    //if (fetchedRepos && action.type === 'REQUEST_BOARD_LIST_SUCCESS') {
    //    console.info('List action.type', action.type);
    //    _boards = fetchedBoards;
    //    _repos = response.login.repos.filter(function (repo) {
    //        return repo.fork == false;
    //    });
    //    ListStore.emitChange();
    //}

});

module.exports = ListStore;