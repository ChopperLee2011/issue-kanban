'use strict';

var humps = require('humps'),
    normalizr = require('normalizr'),
    camelizeKeys = humps.camelizeKeys,
    Schema = normalizr.Schema,
    arrayOf = normalizr.arrayOf,
    normalize = normalizr.normalize,
    assign = require('object-assign'),
    superagent = require('superagent');

var API_ROOT = 'https://api.github.com/';

var user = new Schema('users', { idAttribute: 'login' }),
    label = new Schema('label',{ idAttribute: 'name'}),
    issue = new Schema('issue'),
    repo = new Schema('repos', { idAttribute: 'fullName' }),
    board = new Schema('boards');


repo.define({
  owner: user
});

issue.define({
  owner : user
});

var APIUtils = {
  request(endpoint) {
    if (endpoint.indexOf(API_ROOT) === -1) {
      endpoint = API_ROOT + endpoint;
    }

    return superagent(endpoint);
  },
  
  simpleRequest(url){
    return superagent(url);
  },

  extractPagination(response) {
    var link = response.headers.link;
    if (!link) {
      return;
    }

    var nextLink = link.split(',').filter(s => s.indexOf('rel="next"') > -1)[0];
    if (!nextLink) {
      return;
    }

    return {
      nextPageUrl: nextLink.split(';')[0].slice(1, -1)
    };
  },

  normalizeBoardArrayResponse(response) {
    console.info('response',response);
    return normalize(response,{boards:arrayOf(board)});
    // return assign(
    //   normalize(camelizeKeys(response.body), arrayOf(board)),
    //   APIUtils.extractPagination(response)
    // );
  },


  normalizeUserResponse(response) {
    return assign(
      normalize(camelizeKeys(response.body), user),
      APIUtils.extractPagination(response)
    );
  },

  normalizeUserArrayResponse(response) {
    return assign(
      normalize(camelizeKeys(response.body), arrayOf(user)),
      APIUtils.extractPagination(response)
    );
  },

  normalizeRepoResponse(response) {
    return assign(
      normalize(camelizeKeys(response.body), repo),
      APIUtils.extractPagination(response)
    );
  },

  normalizeRepoArrayResponse(response) {
    return assign(
      normalize(camelizeKeys(response.body), arrayOf(repo)),
      APIUtils.extractPagination(response)
    );
  },
  normalizeIssueArrayResponse(response){
      return assign(
      normalize(camelizeKeys(response.body),arrayOf(issue)),
      APIUtils.extractPagination(response)
    );
  }
};

module.exports = APIUtils;