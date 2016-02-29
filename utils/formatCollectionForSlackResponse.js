'use strict'

var _ = require('lodash');

module.exports = function formatCollectionForSlackResponse(collection) {
  var data = {};
  var titles = [];
  var index = 1;

  data.text = "*" + collection.username + "* owns " + collection.gameTitles.length + " items:";

  _.each(collection.gameTitles, function(gameTitle) {
    titles.push(index.toString() + ". " + gameTitle);
    index++;
  });
  data.attachments = { 
    text: titles.join('\n')
    mrkdwn_in: ["text"]
  };

  return data;
}
