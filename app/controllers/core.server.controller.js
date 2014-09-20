'use strict';

var fs = require('fs');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null
	});
};

exports.loggedin = function(req, res) {
	console.log('Logging in');
	res.render('loggedin', {
		user: req.user || null
	});
};