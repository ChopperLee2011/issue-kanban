'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    BoardService = require('../utils/BoardService');

var BoardActionCreators = {
    requestBoardList(userName) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_BOARD_LIST,
            userName: userName
        });
        BoardService.requestBoardList(userName);
    },
    requestBoard(boardName) {

        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_BOARD,
            boardName: boardName
        });
        BoardService.getByOwner(boardName);
    },
    loadBoard(boardName){
        AppDispatcher.handleViewAction({
            type: ActionTypes.LOAD_BOARD,
            boardName: boardName
        });
        BoardService.refreshBoard(boardName);
    },
    createBoard(newBoard){
        AppDispatcher.handleViewAction({
            type: ActionTypes.CREATE_BOARD,
            newBoard: newBoard
        });
        BoardService.createBoard(newBoard);
    },
    requestBoardIssues(repos){
        AppDispatcher.handleViewAction({
            type: ActionTypes.REQUEST_ISSUES,
            boardRepos: repos
        });
        BoardService.getIssues(repos);
    },
    updateTicket(ticket, column){
        AppDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_TICKET,
            ticket: ticket,
            column: column
        });
        BoardService.updateTicket(ticket, column);
    },
    updateIssue(index, column){
        AppDispatcher.handleViewAction({
            type: ActionTypes.UPDATE_ISSUE,
            index: index,
            column: column
        });
    },
    getTicket(repos){
        AppDispatcher.handleViewAction({
            type: ActionTypes.GET_TICKET,
            repos: repos
        });
        BoardService.getTicket(repos);
    }

};

module.exports = BoardActionCreators;