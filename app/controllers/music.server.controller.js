'use strict';

var twilio = require('twilio'),
		music = require('../models/music.server.model');

exports.parseSms = function(req, res, next) {
	var twiml = new twilio.TwimlResponse();
	var songName = req.body.Body;

	if (req.body.isEmail)
		songName = req.body.subject;

	music.searchSong(songName, next);

	twiml.message('Your song has been added to the playlist queue!!');
	res.type('text/xml');
	res.send(twiml.toString());
};

exports.returnSongs = function(req, res, next) {
	music.returnSongs(req, res, function(err, music) {
		res.send(music);
	});
};

exports.upvoteSong = function(req, res, next) {
	music.upvoteSong(req, res, function(err, success) {
		res.send(success);
	});
};

exports.downvoteSong = function(req, res, next) {
	music.downvoteSong(req, res, function(err, success) {
		res.send(success);
	});
};