'use strict';

var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({
    AUTH_SIGNIN: null,
    AUTH_SIGNIN_SUCCESS: null,
    AUTH_SIGNIN_ERROR: null,

    REQUEST_USER: null,
    REQUEST_USER_SUCCESS: null,
    REQUEST_USER_ERROR: null,

    REQUEST_REPO: null,
    REQUEST_REPO_SUCCESS: null,
    REQUEST_REPO_ERROR: null,

    REQUEST_ISSUES: null,
    REQUEST_ISSUES_SUCCESS: null,
    REQUEST_ISSUES_ERROR: null,

    REQUEST_LABELS: null,
    REQUEST_LABELS_SUCCESS: null,
    REQUEST_LABELS_ERROR: null,

    REQUEST_BOARD: null,
    REQUEST_BOARD_SUCCESS: null,
    REQUEST_BOARD_ERROR: null,

    LOAD_BOARD: null,
    LOAD_BOARD_SUCCESS: null,
    LOAD_BOARD_ERROR: null,

    REQUEST_BOARD_LIST: null,
    REQUEST_BOARD_LIST_SUCCESS: null,
    REQUEST_BOARD_LIST_ERROR: null,

    CREATE_BOARD: null,
    CREATE_BOARD_SUCCESS: null,
    RCREATE_BOARD_ERROR: null,

    REQUEST_REPO_LIST: null,
    REQUEST_REPO_LIST_SUCCESS: null,
    REQUEST_REPO_LIST_ERROR: null,

    SYNC_POUCHDB: null,
    SYNC_POUCHDB_SUCCESS: null,
    SYNC_POUCHDB_ERROR: null,

    GET_TICKET: null,
    GET_TICKET_SUCCESS: null,
    GET_TICKET_ERROR: null,

    UPDATE_TICKET: null,
    UPDATE_TICKET_SUCCESS: null,
    UPDATE_TICKET_ERROR: null,

    UPDATE_ISSUE: null,
    UPDATE_ISSUE_SUCCESS: null,
    UPDATE_ISSUE_ERROR: null
});