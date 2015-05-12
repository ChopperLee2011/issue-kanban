/**
 * Created by chopper on 15-3-2.
 */
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    RepoAPI = require('../utils/RepoAPI');
var AuthActionCreators = {
    signin() {
        AppDispatcher.handleViewAction({
            type: ActionTypes.AUTH_SIGNIN

        });
        RepoAPI.requestAuth();
    }
};
module.exports = AuthActionCreators;