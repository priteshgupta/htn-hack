'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'mySocket', 
	function($scope, Authentication, mySocket) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
   	$scope.songs = [];
		// mySocket.emit('message', 'debug');

     mySocket.on('broadcast', function(msg) {
     	$scope.songs.push(msg);
     	$.ajax(window.playlist_url + '/tracks?uris=' + msg.u, {
     		method: 'POST',
     		headers: {
     			'Authorization': 'Bearer ' + window.token
     		},
     		success: function(response) {
     			document.getElementById('community-playlist').src = document.getElementById('community-playlist').src;
     			console.log(response);
     		}
     	});
   });
	}
]);