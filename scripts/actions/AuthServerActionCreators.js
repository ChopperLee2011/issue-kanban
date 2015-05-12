'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

var AuthServerActionCreators = {
    signinSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.AUTH_SIGNIN_SUCCESS,
            response: response

        });
    },
    signinError(err) {
        console.log(err);
        AppDispatcher.handleServerAction({
            type: ActionTypes.AUTH_SIGNIN_ERROR
        });
    }
};

module.exports = AuthServerActionCreators;