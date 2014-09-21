'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
		.state('player', {
			url: '/player',
			templateUrl: 'modules/core/views/player.client.view.html'
		});
	}
]);

angular.module('core')
.factory('mySocket', function(socketFactory) {
    return socketFactory();
});