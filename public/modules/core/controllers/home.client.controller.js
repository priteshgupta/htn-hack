'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$filter', 'Authentication', 'mySocket', 
	function($scope, $http, $filter, Authentication, mySocket) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
   	$scope.songs = [];
   	$scope.orderPred = '-score';
		// mySocket.emit('message', 'debug');

		$http.get('/returnComSongs').success(function(data) {
			$scope.songs = data;
		});

    mySocket.on('broadcast', function(msg) {
    	var exists = false;

    	$scope.songs.forEach(function(song) {
    		if (song.title === msg.title) {
    			exists = true;
    			++song.score;
    			setTimeout(function() {
    				$scope.createPlaylist();
    			}, 0);
    		}
    	});

    	if (!exists) {
	     	$scope.songs.push(msg);
	     	window.spot_songs.push(msg.sid);

	     	setTimeout(function() {
	     		$scope.createPlaylist();
	     	}, 0);

	     	// setTimeout(function() {
		     // 	$('.upvote').upvote();
	     	// }, 300);
    	}
   	});

    $scope.changeSong = function(song) {
    	$('#community-playlist-try').attr('src', 'https://embed.spotify.com/?uri=spotify:track:' + song.sid);
    	$scope.playlistCreated = false;
    	// $scope.$apply();
    };

    $scope.upvoteSong = function(single) {
    	$http.post('/upvoteSong', { name: single.song.title }).success(function(success) {
    		++single.song.score;
    		setTimeout(function() {
    			$scope.createPlaylist();
    		}, 0);
    	});
    };

    $scope.downvoteSong = function(single) {
    	$http.post('/downvoteSong', { name: single.song.title }).success(function(success) {
	    	--single.song.score;
	    	setTimeout(function() {
	    		$scope.createPlaylist();
	    	}, 0);
    	});
    };

  	$scope.createPlaylist = function(accessToken) {
  		// if (document.cookie.replace(/(?:(?:^|.*;\s*)spotcompl\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
  			// return;

  		accessToken = accessToken || window.token;

      var date = new Date();
      var plName = 'Playup ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

      var url = 'https://api.spotify.com/v1/users/' + window.user_id + '/playlists';
      var uristring = '';

      $.ajax(url, {
      	method: 'POST',
      	data: JSON.stringify({
      		'name': plName,
      		'public': false
      	}),
      	dataType: 'json',
      	headers: {
      		'Authorization': 'Bearer ' + accessToken,
      		'Content-Type': 'application/json'
      	},
      	success: function(response) {
      		var i = 0;
      		var len = $scope.songs.length;
      		var songs = $filter('orderBy')($scope.songs, $scope.orderPred);

      		songs.forEach(function(song) {
			  		if (i == len - 1) {
  	    			uristring += 'spotify:track:' + song.sid;
						} else {
	      			uristring += 'spotify:track:' + song.sid + ',';							
						}
						i++;
      		});
      		
      		$.ajax(response.href + '/tracks?uris=' + uristring, {
      			method: 'POST',
      			headers: {
      				'Authorization': 'Bearer ' + window.token
      			},
      			success: function(response2) {
      				var sp_c_frameUrl = 'https://embed.spotify.com/?uri=spotify:user:' + response.owner.id + ':playlist:' + response.id + '&theme=white';
      				$('#community-playlist').attr('src', sp_c_frameUrl);
      				$scope.playlistCreated = true;
      				$scope.$apply();
      				// document.cookie = 'spotcompl=true';

      				// document.getElementById('community-playlist').src = document.getElementById('community-playlist').src;
      			}
      		});
      	}
      });
  	};

	}
]);