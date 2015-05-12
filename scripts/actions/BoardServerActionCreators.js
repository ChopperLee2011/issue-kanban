'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

var BoardServerActionCreators = {
    handleBoardListSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.REQUEST_BOARD_LIST_SUCCESS,
            response: response
        });
    },

    handleBoardListError(err) {
        console.log(err);

        AppDispatcher.handleServerAction({
            type: ActionTypes.REQUEST_BOARD_LIST_ERROR
        });
    },
    handleBoardSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.REQUEST_BOARD_SUCCESS,
            response: response
        });
    },

    handleBoardError(err) {
        console.log(err);

        AppDispatcher.handleServerAction({
            type: ActionTypes.REQUEST_BOARD_ERROR
        });
    },
    handleCreateBoardSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.CREATE_BOARD_SUCCESS,
            response: response
        });
    },

    handleCreateBoardError(err) {
        console.log(err);
        AppDispatcher.handleServerAction({
            type: ActionTypes.CREATE_BOARD_ERROR
        });
    },
    handleBoardIssuesSuccess(response) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.REQUEST_ISSUES_SUCCESS,
            response: response
        });
    },

    handleBoardIssuesError(err) {
        console.log(err);
        AppDispatcher.handleServerAction({
            type: ActionTypes.REQUEST_ISSUES_ERROR
        });
    }
};

module.exports = BoardServerActionCreators;