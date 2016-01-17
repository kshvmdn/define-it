'use strict';
const request = require('request');

var getJSON = function(query, cb) {
  if (typeof query != 'string') cb(TypeError('Expected a string as first argument.'));

  const base = 'https://www.googleapis.com/scribe/v1/research';
  const qs = {
    key: 'AIzaSyDqVYORLCUXxSv7zneerIgC2UYMnxvPeqQ',
    dataset: 'dictionary',
    dictionaryLanguage: 'en',
    callback: cb,
    query: query
  }

  request({url: base, qs: qs, json: true}, function(error, response, body) {
    cb(error, body);
  });
}

var getDefinition = function(query, cb) {
  getJSON(query, function(error, response) {
    if (response.data == undefined) cb(ReferenceError('No results found for given query.'));
    var definitions = [];
    response.data[0]['dictionaryData']['definitionData'].forEach(function(obj, i) {
      definitions.push(obj.meanings[0].meaning)
    });
    cb(error, definitions);
  });
}

module.exports = getJSON;
module.exports.getDef = getDefinition;
