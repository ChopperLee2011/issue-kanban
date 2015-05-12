'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    PouchService = require('../utils/PouchService');
var DBActionCreators = {
    syncDB(boardName) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.SYNC_POUCHDB
        });
        PouchService.connect(boardName);
    }
};
module.exports = DBActionCreators;