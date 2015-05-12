'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes');

var DBServerActionCreators = {
    handleSyncPouchSuccess() {
            AppDispatcher.handleServerAction({
                type: ActionTypes.SYNC_POUCHDB_SUCCESS,
            });
        },

        handleSyncPouchError(err) {
            console.log(err);
            AppDispatcher.handleServerAction({
                type: ActionTypes.SYNC_POUCHDB_ERROR
            });
        }
};

module.exports = DBServerActionCreators;