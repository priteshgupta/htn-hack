'use strict';

var twilio = require('twilio'),
		music = require('../models/music.server.model');

exports.parseSms = function(req, res) {
	var twiml = new twilio.TwimlResponse();
	twiml.message('Your song has been added to the playlist queue!!');

	music.searchSong(req.body.Body, function() {
		// twiml.message('Your song has been added to the playlist queue!!');
	});

	res.type('text/xml');
	res.send(twiml.toString());
};