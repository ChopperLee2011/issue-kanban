'use strict';

var RepoServerActionCreators = require('../actions/RepoServerActionCreators');
var AuthServerActionCreators = require('../actions/AuthServerActionCreators');

var async = require('async');
var _ = require('lodash');
var superagent = require('superagent');

var {
    request,
    simpleRequest,
    normalizeRepoResponse,
    normalizeRepoArrayResponse,
    normalizeIssueArrayResponse
    } = require('./APIUtils');

var RepoAPI = {
    requestRepo(fullName) {
        request('repos/' + fullName).end(function (res) {
            if (!res.ok) {
                RepoServerActionCreators.handleRepoError(res.text);
                return;
            }

            var response = normalizeRepoResponse(res);
            RepoServerActionCreators.handleRepoSuccess(response);
        });
    },
    requestLabel(fullName){
        request('repos/' + fullName + '/labels').end(function (res) {
            if (!res.ok) {
                RepoServerActionCreators.handleLabelError(res.text);
                return;
            }
            var response = res;
            RepoServerActionCreators.handleLabelSuccess(response);
        });
    },
    requestIssuePage(fullName, issues) {
        console.info('API,issues',issues);
        async.waterfall([
            function (callback) {
                var issueList = {};
                issueList[fullName] = [];
                issues.map(function (issue) {
                    simpleRequest(issue.id).end(function (res) {
                        if (!res.ok) {

                            RepoServerActionCreators.handleIssueError(fullName, res.text);
                            return;
                        }

                        //only use issue title and label for now;
                        issue.title = res.body.title;

                        issueList[fullName].push(issue);
                        if (issueList[fullName].length === issues.length) {
                            callback(null, issueList);
                        }
                    });
                });
            },
            function (issueList, callback) {
                console.info('step 3 issueList', issueList);
                var response = {};
                //sort for weight
                issueList[fullName] = _.sortBy(issueList[fullName],'weight').reverse();
                response['issues'] = issueList;
                RepoServerActionCreators.handleIssueSuccess(fullName, response);
                callback(null);
            }
        ], function (err, result) {
            // result now equals 'done'
            console.log('done');
        });

    },
    requestAuth() {
        simpleRequest('/user')
            .set('Accept', 'application/json')
            .end(function (res) {
                if (!res.ok) {
                    AuthServerActionCreators.signinError(res.text);
                    return;
                }
                var response = {};
                response.login = res.body;
                AuthServerActionCreators.signinSuccess(response);
            });
    }
};

module.exports = RepoAPI;