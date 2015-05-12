'use strict';
var PouchDB = require('pouchdb'),
    _ = require('lodash'),
    RepoAPI = require('./RepoAPI'),
    DBServerActionCreators = require('../actions/DBServerActionCreators');
// var pouchdb = new PouchDB('boards');
const COUCHDB_URL = 'http://localhost:3000/couch';
var PouchSerivce = {
    //connect pouchdb
    connect(boardName){
        var syncDb = this.sync(boardName);

    },

    //sync pouchdb and couchdb
    sync(boardName,opts={}) {
        var remoteCouch = COUCHDB_URL +'/board' + encodeURIComponent(boardName);
        opts = _.assign(opts, {live:true} );
        //TODO:change boardname to boardId
        PouchDB.sync(boardName, remoteCouch, opts)
            // .on('change', function (info) {
            //     console.log('database change event');
            //     PouchSerivce.requestBoard(boardName);
            // })
            .on('complete',function(){
                DBServerActionCreators.handleSyncPouchSuccess();
            })
            .on('error', function (err) {
                DBServerActionCreators.handleSyncPouchError(err);
            });
        DBServerActionCreators.handleSyncPouchSuccess();
    },

    // get label data
    requestLabel(fullName) {
        var pouchdb = new PouchDB('boards');
        var remoteCouch = 'http://localhost:5984/boards';
        // pouchdb.replicate.from(remoteCouch);

        // PouchDB.replicate('boards', remoteCouch, {
        //         live: true
        //     })
        //     .on('change', function(info) {
        //         // handle change
        //     }).on('complete', function(info) {
        //         // handle complete
        //     }).on('error', function(err) {
        //         // handle error
        //         console.info('err', err)
        //     });
        // var pouchdb = new PouchDB('boards');

      PouchDB.sync(pouchdb, remoteCouch, {
            since: 'now',
            live: true
        }).on('error', function (err) {
                console.info('sync database err', err)
            });

        var boardName = fullName.split('/')[1].toLowerCase();
        var map = function (doc) {
            if (doc.name) {
                emit(doc.name.toLowerCase(), null);
            }
        };
        pouchdb.query(map, {
            key: boardName
        }).then(function (response) {
            console.info('DATA response', response);
            return pouchdb.get(response.rows[0].id);
        })
            .then(function (doc) {
                var label = _.keys(doc.labels);
                var labels = {};
                labels[fullName] = label;
                var response = {};
                response['labels'] = labels;
                RepoServerActionCreators.handleLabelSuccess(fullName, response);
            })
            .catch(function (err) {
                console.info('get data error ' + err);
                RepoServerActionCreators.handleLabelError(err);
            });
    },
    // get label data
    requestBoard(fullName) {
        var issueDb = new PouchDB('board/' + fullName);
        //            var remoteCouch = 'http://127.0.0.1:5984/board' + encodeURI('/'+fullName);
        //                  var issueDb = new PouchDB('board/'+fullName);
        //          var remoteCouch = 'http://127.0.0.1:5984/board%2Fchopperlee2011%2Ftest';
        //                  console.info('step 1 remoteCoute',remoteCouch);
        // issueDb.info(function(err, info) {
        // console.info('database info',info);});
        // issueDb.sync(remoteCouch);
        //
        //            var sync = PouchDB.sync(issueDb, remoteCouch, {
        //                live: true
        //            }).on('error', function(err) {
        //                console.info('err', err);
        //            });
        issueDb.allDocs({
            include_docs: true
        }, function (err, response) {
            // console.info('step 1 response',response);

            if (err) {
                console.log('get data error ' + err);
                return;
            }
            // console.info('step 1 response',response);
            var issues = [];
            response.rows.map(function (res) {
                var issue = {}
                issue.id = res.id;
                issue.label = res.doc.label;
                issue.weight = res.doc.weight;
                issues.push(issue);
            });
            //issues = _.sortBy(issues, 'weight');
            RepoAPI.requestIssuePage(fullName, issues);

            //        var repoUrl = response._id;
            //        var label = response.label;
            //        RepoAPI.requestIssuePage(fullName, repoUrl, label);
        });
        // .catch(function(err) {
        //     console.log('get data error ' + err);
        // });
        // var boardName = fullName.split('/')[1].toLowerCase();

        // var map = function(doc) {
        //     if (doc.name) emit(doc.name.toLowerCase(), null);
        // };
        // pouchdb.query(map, {
        //     key: boardName
        // }).then(function(response) {
        //     return pouchdb.get(response.rows[0].id);
        // }).then(function(doc) {
        //     var repoUrl = doc.owner + '/' + doc.repos[0];
        //     RepoAPI.requestIssuePage(fullName, repoUrl);

        // }).catch(function(err) {
        //     console.info('get data error ' + err);
        // });
    }
}

module.exports = PouchSerivce;