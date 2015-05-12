const AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes = require('../constants/ActionTypes'),
    {createStore, mergeIntoBag, isInBag} = require('../utils/StoreUtils');

let _issues = {};

let IssueStore = createStore({
    contains(fullName, fields) {
        return isInBag(_issues, fullName, fields);
    },
    //get(fullName) {
    //    return _issues[fullName];
    //},
    get() {
        return _issues;
    },
    update(index, column){
        //todo: update pouchdb sync
        console.info('IssueStore _issues',_issues);
        _issues[0][index].column = column;
    }
});

IssueStore.dispatchToken = AppDispatcher.register(function (payload) {

    let action = payload.action,
        response = action.response;
    switch (action.type) {
        case ActionTypes.UPDATE_ISSUE:
            console.info('Issue action', action);
            IssueStore.update(action.index, action.column);
            IssueStore.emitChange();
            break;
        case ActionTypes.REQUEST_ISSUES_SUCCESS:
            _issues = response;
            console.info('IssueStore REQUEST _issues', _issues);
            IssueStore.emitChange();
            break;
    }

    //var action = payload.action,
    //    //fullName = action && action.fullName,
    //    response = action.response,
    //if (action.type === 'REQUEST_ISSUES_SUCCESS') {
    //    _issues = response;
    //    console.info('Store _issues', _issues);
    //    IssueStore.emitChange();
    //}
    //if (fetchedIssues) {
    //    console.info('Store fetchedIssues', fetchedIssues);
    //    // if ( typeof fetchedIssues[fullName] === 'object'){
    //    //     fetchedIssues[fullName] = _.values(fetchedIssues[fullName]);
    //    // }
    //    // mergeIntoBag(_issues, fetchedIssues);
    //    _issues = fetchedIssues;
    //    console.info('Store _issues', _issues);
    //
    //    IssueStore.emitChange();
    //}
});

module.exports = IssueStore;