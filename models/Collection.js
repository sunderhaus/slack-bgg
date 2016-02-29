var decodeXML = require('../utils/decodeXML');
var _ = require('lodash');

function Collection(username, gameTitles) {
  "use strict";
  this.username = username;
  this.gameTitles = gameTitles;

  Collection.prototype.getUsername = function() { return this.username };
  Collection.prototype.getGameTitles = function() { return this.gameTitles };
  Collection.prototype.setFromPayload = function(username, bggPayload) {
    // Remove items that aren't owned.
    _.remove(bggPayload.items.item, function (item) {
      return item.status.own < 1;
    });

    // Retrieve just the game titles in a collection
    var gameTitles = [];
    _.each(bggPayload.items.item, function (item) {
      gameTitles.push(decodeXML(item.name.$t));
    });

    return new Collection(username, gameTitles);
  }
}

module.exports = Collection;
