'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    {
        createStore, mergeIntoBag
        } = require('../utils/StoreUtils');
var _board = {};

var BoardByNameStore = createStore({
    get() {
        return _board;
    }
});
BoardByNameStore.dispatchToken = AppDispatcher.register(function (payload) {
    if (payload.action.type === 'REQUEST_BOARD_SUCCESS') {
        var action = payload.action,
            response = action.response,
            fetchedColumns = response && response.columns;
        if (fetchedColumns) {
            _board = fetchedColumns;
            BoardByNameStore.emitChange();
        }
    }
});

module.exports = BoardByNameStore;