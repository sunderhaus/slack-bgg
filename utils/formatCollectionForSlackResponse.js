'use strict'

var _ = require('lodash');

module.exports = function formatCollectionForSlackResponse(collection) {
  var data = {};
  var attachments = [];

  data.text = "Here are the titles " + collection.username + " owns:";

  _.each(collection.gameTitles, function(gameTitle) {
    attachments.push({text: gameTitle});
  });
  data.attachments = attachments;

  return data;
}
