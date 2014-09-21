'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	var music = require('../../app/controllers/music');

	app.route('/').get(core.index);
	app.route('/loggedin').get(core.loggedin);
	app.route('/returnComSongs').get(music.returnSongs);
	app.route('/upvoteSong').post(music.upvoteSong);
	app.route('/downvoteSong').post(music.downvoteSong);
};