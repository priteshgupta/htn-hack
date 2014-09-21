'use strict';

var twilio = require('twilio'),
		music = require('../models/music.server.model');

exports.parseSms = function(req, res, next) {
	var twiml = new twilio.TwimlResponse();
	music.searchSong(req.body.Body, next);

	twiml.message('Your song has been added to the playlist queue!!');
	res.type('text/xml');
	res.send(twiml.toString());
};