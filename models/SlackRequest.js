function SlackRequest(body) {
  "use strict";
  console.dir(body);

  this.token = body.token;
  this.teamId = body.team_id;
  this.teamDomain = body.team_domain;
  this.channelId = body.channel_id;
  this.channelName = body.channel_name;
  this.userId = body.user_id;
  this.username = body.user_name;
  this.command = body.command;
  this.text = body.text;
  this.responseUrl = body.response_url;

  SlackRequest.prototype.getToken = function() { return this.token };
  SlackRequest.prototype.getTeamId = function() { return this.teamId };
  SlackRequest.prototype.getTeamDomain = function() { return this.teamDomain };
  SlackRequest.prototype.getChannelId = function() { return this.channelId };
  SlackRequest.prototype.getChannelName = function() { return this.channelName };
  SlackRequest.prototype.getUserId = function() { return this.userId };
  SlackRequest.prototype.getUsername = function() { return this.username };
  SlackRequest.prototype.getCommand = function() { return this.command };
  SlackRequest.prototype.getText = function() { return this.text };
  SlackRequest.prototype.getResponseUrl = function() { return this.responseUrl };

  SlackRequest.prototype.getBGGUserInText = function() { return this.text.split(" ")[0] };
}

module.exports = SlackRequest;