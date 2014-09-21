'use strict';

module.exports = {
	app: {
		title: 'MEAN.JS',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'mongodb, express, angularjs, node.js, mongoose, passport'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'//code.jquery.com/jquery-1.11.0.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				// 'public/lib/angular-cookies/angular-cookies.js',
				// 'public/lib/angular-touch/angular-touch.js',
				// 'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/socket.io-client/socket.io.js',
				'public/lib/angular-socket-io/socket.io.js', 
				'public/lib/angular-socket-io/socket.js', 
				// 'public/lib/angular-socket-io/socket.io.js'
			]
		},
		css: [
			'public/modules/**/css/*.css',
			'https://d2c87l0yth4zbw.cloudfront.net/css/80278a9.css',
			'http://publicis-indonesia.github.io/Waves/static/waves.min.css',
			'public/lib/custom.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/2.0.0-alpha.1/handlebars.min.js',
			'http://publicis-indonesia.github.io/Waves/static/waves.min.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};