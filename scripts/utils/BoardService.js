'use strict';

var _ = require('lodash'),
    superagent = require('superagent'),
    async = require('async'),
    BoardServerActionCreators = require('../actions/BoardServerActionCreators'),
    PouchService = require('./PouchService'),
    PouchDB = require('pouchdb'),
    {
        normalizeRepoArrayResponse,
        normalizeBoardArrayResponse
        } = require('./APIUtils');

var BoardService = {
    refreshBoard(boardName) {
        var self = this;
        self.db = new PouchDB(boardName);
        var deferred = Promise.defer();
        self.getByOwner(boardName).then(function (board) {
            //self.setLabel(board);
            //    console.info('board', board);
            //    return board;
            //});
            return self.getIssues(board.$repos);

        }).then(function () {

            return self.loadIssues(function () {
                return self;
            });
        }).then(function (data) {
        });
        deferred.promise;
    },
    getRepoIssues(repo) {
        let promise = new Promise(function (resolve, reject) {
            superagent.get(repo.url + '/issues')
                .set('Accept', 'application/json')
                .end(function (res) {
                    if (!res.ok) {
                        reject(new Error(res.text));
                    }
                    resolve(JSON.parse(res.text));
                });

        });
        return promise;
    },
    getIssues(repos) {
        let self = this;
        let queue = [];
        repos.forEach(function (repo) {
            queue.push(self.getRepoIssues(repo));
        });
        Promise.all(queue).then(function (issues) {
            //self.$issues = _.indexBy(issues, 'url')
            self.issues = issues;
            BoardServerActionCreators.handleBoardIssuesSuccess(issues);
            return issues;
        });
    },
    loadIssues(done){
        var _this = this;
        var $issues, enabledLabels, maxWeight, ref;
        if (done == null) {
            done = function () {
            };
        }
        enabledLabels = _.chain((ref = _this.labels) != null ? ref : []).filter(function (item) {
            return item.enabled;
        }).pluck('name').value();
        console.info('step 3 _this ', _this);
        maxWeight = 0;
        if (_.isEmpty(_this.issues)) {
            return done();
        }
        $issues = _.clone(_this.issues[0]);
        //for (let i= 0 ; i < issues.length; i++){
        //    $issues[]
        //}
        _this.db.allDocs({
            include_docs: true
        }).then(function (res) {
            console.info('get from database res', res);
            var base, base1, base2, i, item, items, label, len, name, ref1, url;
            if ((res == null) || (res.rows == null)) {
                return;
            }
            _this.issues = _.chain(res.rows).pluck('doc')
                //    .filter(function(item) {
                //    console.info('step 4 item',item);
                //    console.info('$issues',$issues);
                //
                //
                //    if (!item || !item._id) {
                //        return false;
                //    }
                //    if ($issues[item._id] != null) {
                //        return true;
                //    }
                //    //_this.deleteIssue(item._id, item);
                //    return false;
                //})
                .map(function (item) {
                    console.info('step 4.5 item', item);
                    item = _.extend(item, $issues[item._id]);
                    item = _this.setIssueAttrs(item, enabledLabels, maxWeight);
                    if (item.weight > maxWeight) {
                        maxWeight = item.weight;
                    }
                    delete $issues[item._id];
                    return item;
                }).groupBy('label').value();
            for (let i = 0; i < $issues.lenght; i++) {
                let url = $issues[i]._id;
                //for (url in $issues) {
                console.info('url', url);
                item = $issues[url];
                item = _this.setIssueAttrs(item, enabledLabels, maxWeight);
                if (item.weight > maxWeight) {
                    maxWeight = item.weight;
                }
                if ((base = _this.issues)[name = item.label] == null) {
                    base[name] = [];
                }
                _this.issues[item.label].push(item);
            }
            ref1 = _this.issues;
            //for (label in ref1) {
            //    items = ref1[label];
            //    $rootScope.$apply(function() {
            //        return _this.issues[label] = $filter('orderBy')(items, ['-weight', 'updated_at']);
            //    });
            //}
            if ((base1 = _this.issues)['unlabel'] == null) {
                base1['unlabel'] = [];
            }
            for (i = 0, len = enabledLabels.length; i < len; i++) {
                label = enabledLabels[i];
                if ((base2 = _this.issues)[label] == null) {
                    base2[label] = [];
                }
            }
            return done();
        }).catch(function (err) {
            console.log(err);
        });
    },
    deleteIssue(id, issue) {
        return this.db.get(id, (function (_this) {
            return function (err, doc) {
                if (err || !doc || doc.closed) {
                    return;
                }
                doc.closed = true;
                return _this.db.put(doc, function (err) {
                    if (err != null) {
                        $log.warn('error, could not delete issue from pouchdb:', err);
                    }
                    _this.issues[issue.label] = _.reject(_this.issues[issue.label], {
                        url: id
                    });
                    //return $rootScope.$apply();
                });
            };
        })(this));
    },
    //load(boardName) {
    //    this.db = new PouchDB(boardName);
    //    return this.getByOwner(boardName);
    //},
    setLabel(board){
        this.labels = board.labels;
    },

    setIssueAttrs(issue, enabledLabels, maxWeight) {
        var label, ref, toBeSaved;
        toBeSaved = false;
        label = issue.label;
        if ((label == null) || _.indexOf(enabledLabels, label) < 0) {
            issue.label = (ref = _.chain(issue.labels).pluck('name').intersection(enabledLabels).first().value()) != null ? ref : 'unlabel';
            toBeSaved = true;
        }
        if (issue.weight == null) {
            issue.weight = maxWeight + 400;
            toBeSaved = true;
        }
        if (issue._id == null) {
            issue._id = issue.url;
        }
        if (toBeSaved) {
            this.db.put({
                _id: issue._id,
                label: issue.label,
                weight: issue.weight
            });
        }
        return issue;
    },
    //getByOwner(boardName) {
    //    var promise = new Promise(function (resolve, reject) {
    //
    //        superagent.get('/owner/' + boardName)
    //            .set('Accept', 'application/json')
    //            .end(function (res) {
    //                if (!res.ok) {
    //                    reject(new Error(res.text));
    //                }
    //                var board = res.body;
    //                resolve(board);
    //            });
    //    });
    //
    //    return promise;
    //
    //},
    getByOwner(boardName) {
        return superagent.get('/owner/' + boardName)
            .set('Accept', 'application/json')
            .withCredentials()
            .end(function (res) {
                if (!res.ok) {
                    BoardServerActionCreators.handleBoardError(res.text);
                    return;
                }
                var board = res.body;
                BoardServerActionCreators.handleBoardSuccess(board);
                return board;
            });
    },

    requestBoardList(user) {
        async.waterfall([
            function (callback) {
                //user board
                superagent.get('/board')
                    .set('Accept', 'application/json')
                    .end(function (res) {
                        if (!res.ok) {
                            BoardServerActionCreators.handleBoardListError(res.text);
                            return;
                        }
                        var response = {};
                        response.boards = res.body;
                        callback(null, response);
                    });
            },
            function (response, callback) {
                superagent.get('/user')
                    .set('Accept', 'application/json')
                    .end(function (res) {
                        if (!res.ok) {
                            BoardServerActionCreators.handleBoardListError(res.text);
                            return;
                        }
                        response.login = res.body;
                        callback(null, response);
                    });
            },
            function (response, callback) {
                //org board
                _.pluck(response.login.orgs, 'login').forEach(function (org) {
                    console.log('boardservice org', org);

                    superagent.get('/owner/' + org)
                        .set('Accept', 'application/json')
                        .end(function (res) {
                            if (!res.ok) {
                                BoardServerActionCreators.handleBoardListError(res.text);
                                return;
                            }
                            // response.boards.push(_.values(res.body));
                            response.boards = response.boards.concat(res.body);
                            BoardServerActionCreators.handleBoardListSuccess(response);
                        });
                });
                callback(null, response);
            }
        ], function (err, response) {
            BoardServerActionCreators.handleBoardListSuccess(response);
        });
    },
    createBoard(newBoard){
        var self = this;
        //TODO: find board
        var data = {
            name: newBoard.name,
            owner: newBoard.owner,
            description: newBoard.description,
            repos: newBoard.selectedRepos.split(',')
        };
        superagent.post('/board')
            .send(data)
            .set('Accept', 'application/json')
            .end(function (res) {
                if (!res.ok) {
                    BoardServerActionCreators.handleCreateBoardError(res.text);
                    return;
                }
                //var response = {};
                //response.boards = res.body;
                //callback(null, response);
                //TODO:add webhook
                data.repos.forEach(function (repo) {
                    return self.addWebhook(repo)
                });
                //self.getCache(newBoard);
                superagent.get('/owner/' + newBoard.owner + '/' + newBoard.name)
                    .set('Accept', 'application/json')
                    .end(function (res) {
                        if (!res.ok) {
                            BoardServerActionCreators.handleCreateBoardError(res.text);
                            return;
                        }
                        BoardServerActionCreators.handleCreateBoardSuccess(res);
                    });
            });
    },
    addWebhook(repo){
        return true;
    },
    //getCache(board,cb){
    //    superagent.get('/owner/' + board.owner +'/' + board.name )
    //        .set('Accept', 'application/json')
    //        .end(function (res) {
    //            if (!res.ok) {
    //
    //            }
    //}
    //addWebHook(owner, repoName, cb){
    //    var url_port = 3000,
    //        //not sure about this
    //        hook_url = 'https://localhost:',
    //        insecure_ssl = 1;
    //change to backend
    //githubService.post('/repos/' + owner + '/' + repoName + '/hooks', {
    //    'name': 'web',
    //    'active': true,
    //    'events': [
    //        'issue_comment',
    //        'issues'
    //    ],
    //    'config': {
    //        'url': hook_url,
    //        'content_type': 'json',
    //        'secret': 'sweepboard',
    //        'insecure_ssl': insecure_ssl
    //    }
    //}).then(function(res) {
    //    cb(res);
    //});
    updateTicket(ticket, column){
        //TODO: change to the pouchdb;
    },
    //getRepos(boardName){
    //    return superagent.get('/owner/' + boardName)
    //        .set('Accept', 'application/json')
    //        .end(function (res) {
    //            //if (!res.ok) {
    //            //    return;
    //            //}
    //            var board = res.body;
    //            console.info('BoardServce board.repos[0]', board.repos[0]);
    //            return board.repos[0];
    //        });
    //},
    getRepos(boardName) {
        let promise = new Promise(function (resolve, reject) {

            superagent.get('/owner/' + boardName)
                .set('Accept', 'application/json')
                .end(function (res) {
                    if (!res.ok) {
                        reject(new Error(res.text));
                    }
                    var board = res.body;
                    resolve(board.repos[0]);
                });
        });
        return promise;
    }
};

module.exports = BoardService;