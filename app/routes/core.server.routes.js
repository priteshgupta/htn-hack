'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	var music = require('../../app/controllers/music');

	app.route('/').get(core.index);
	app.route('/parseSms').post(music.parseSms);
	app.route('/loggedin').get(core.loggedin);
};