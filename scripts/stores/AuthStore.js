'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),

    {
        createStore, mergeIntoBag
        } = require('../utils/StoreUtils');

var _user = {};
var AuthStore = createStore({

    get() {
        return _user;
    },
    //for logout
    remove() {
        _user = {};
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action,
        response = action.response,
        login = response && response.login;
    if (login) {
        mergeIntoBag(_user, login);
        AuthStore.emitChange();
    }
});

module.exports = AuthStore;