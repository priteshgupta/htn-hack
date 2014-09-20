'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core');
	app.route('/').get(core.index);
	app.post('/test', function (req, res, next) {
		console.log(req.body);
		console.log(req.params);
		console.log(req.query);
		res.send('Hello World');
	});
};
