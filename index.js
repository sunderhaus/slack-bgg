var bgg = require('bgg')();
var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var formatCollectionForSlackResponse = require('./utils/formatCollectionForSlackResponse');
var SlackRequest = require('./models/SlackRequest');
var Collection = require('./models/Collection');

var app = express();
var PORT = process.env.PORT || 3000;
var SC_COLLECTION_TOKEN = process.env.SC_COLLECTION_TOKEN || undefined;

app.use( bodyParser.json() );

app.post('/collection', function(req, res) {
  var sr = new SlackRequest(req.body);
  var requestedBGGUser = sr.getBGGUserInText();
  // Make sure we have a username before pinging BGG
  if (!requestedBGGUser) {
    console.error('[WARNING] Bad request: Username was not defined.');
    res.sendStatus(400);
  } else {
    // Make the request for the BGG data
    bgg('collection', {username: requestedBGGUser})

      // When we're successful, parse the payload and format the response.
      .then(function(bggPayload) {
        // If we actually receive content back
        if (bggPayload) {
          // Create a new collection and fill it with our data from the requested BGG username and the BGG response
          var collection = new Collection;
          collection = collection.setFromPayload(requestedBGGUser, bggPayload);

          // Prepare the response to be sent back to Slack
          var data = formatCollectionForSlackResponse(collection);

          var titleCount = collection.gameTitles.length;
          console.log('[INFO] Retrieved ' + titleCount + ' titles for BGG user \'' + collection.username + '\' requested by Slack user \'' + sr.getUsername() + '\'.');
          res.send(data);
        }

      // WHen things fail, dump the log and bail with a HTTP 500 error.
      }, function(reason) {
        console.error(new Error(reason));
        res.sendStatus(500);
      });
  }
});

app.listen(PORT, function() {
  console.log('[INFO] BGG App listening on port: ' + PORT + '.');
});
