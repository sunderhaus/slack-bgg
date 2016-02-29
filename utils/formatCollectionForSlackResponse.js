'use strict'

var _ = require('lodash');

module.exports = function formatCollectionForSlackResponse(collection) {
  var data = {};
  var titles = [];
  var index = 1;

  data.text = "*" + collection.username + "* owns " + collection.gameTitles.length + " items:";

  _.each(collection.gameTitles, function(gameTitle) {
    // Add the game title with the numbered list markdown
    titles.push(index.toString() + ". " + gameTitle);
    index++;
  });
  
  // Add the titles directly to the text property separated by new lines.
  data.text = data.text + "\n" + titles.join('\n');

  return data;
}
