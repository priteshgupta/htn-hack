'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);

	setTimeout(function() {
		// find template and compile it
		var playlistsListTemplateSource = document.getElementById('playlists-list-template').innerHTML,
		    playlistsListTemplate = Handlebars.compile(playlistsListTemplateSource),
		    playlistsListPlaceholder = document.getElementById('playlists-list'),
		    
		    playlistDetailTemplateSource = document.getElementById('playlist-detail-template').innerHTML,
		    playlistDetailTemplate = Handlebars.compile(playlistDetailTemplateSource),
		    playlistDetailPlaceholder = document.getElementById('playlist-detail')

		if (document.getElementById('login')) {
			document.getElementById('login').addEventListener('click', function() {
		    login();
			});
		}

		function login() {
		    var width = 400,
		        height = 500;
		    var left = (screen.width / 2) - (width / 2);
		    var top = (screen.height / 2) - (height / 2);
		    
		    var params = {
		        client_id: '48cdd615536f436288c432e3f760ac66',
		        redirect_uri: 'http://104.131.40.122:3000/loggedin',
		        scope: 'user-read-private playlist-read-private playlist-modify playlist-modify-private',
		        response_type: 'token'
		    };
		    authWindow = window.open(
		        "https://accounts.spotify.com/authorize?" + toQueryString(params),
		        "Spotify",
		        'expires_in=172800,menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
		    );
		}

		function toQueryString(obj) {
		    var parts = [];
		    for (var i in obj) {
		        if (obj.hasOwnProperty(i)) {
		            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
		        }
		    }
		    return parts.join("&");
		}

		var authWindow = null;
		var token = null;
		var myCookie = null;
		var user_id = 'ecs-priteshg';
		var sp_user = 'ecs-priteshg';
		var sp_playlist = '36lspQixPdiCRNY925VemB';	
		var sp_frameUrl = 'https://embed.spotify.com/?uri=spotify:user:' + sp_user + ':playlist:' + sp_playlist + '&theme=white';
		var sp_newPlaylist = '';

		var searchCookie = function() {
			myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)spotau\s*\=\s*([^;]*).*$)|^.*$/, "$1");

			if (myCookie) {
        $('div#login').hide();
				clearInterval(checkCookie);
		    showInfo(myCookie, function(myCookie) {
		    	createPlaylist(myCookie);
		    });
			}
		};

		var checkCookie = setInterval(searchCookie, 200);

		function createPlaylist(accessToken) {
			if (document.cookie.replace(/(?:(?:^|.*;\s*)spotcompl\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
				return;

	    var date = new Date();
	    var plName = 'HTN ' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

	    var url = 'https://api.spotify.com/v1/users/' + user_id + '/playlists';

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
	    		window.playlist_url = sp_newPlaylist = response.href;
	    		var sp_c_frameUrl = 'https://embed.spotify.com/?uri=spotify:user:' + response.owner.id + ':playlist:' + response.id + '&theme=white';
	    		$('#community-playlist').attr('src', sp_c_frameUrl);
	    		document.cookie = 'spotcompl=true';
	    	}
	    });
		};

		function showInfo(accessToken, cb) {
		    window.token = token = accessToken;
		    // fetch my public playlists
		    $.ajax({
		        url: 'https://api.spotify.com/v1/me',
		        headers: {
		            'Authorization': 'Bearer ' + accessToken
		        },
		        success: function(response) {
		            user_id = response.id.toLowerCase();         
		            $.ajax({
		                url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists?limit=15',
		                headers: {
		                    'Authorization': 'Bearer ' + accessToken
		                },
		                success: function(response) {
	                    playlistsListPlaceholder.innerHTML = playlistsListTemplate(response.items);
                      Waves.displayEffect({duration: 1250});
		                }
		            });
		         
		            $('div#login').hide();
		            $('div#loggedin').show();
		            cb(accessToken);
		        },
		        error: function(response) {
		        	$('div#login').show();
		        	alert('Something went wrong, please refresh the page after logging in');
		        }
		    });
		};

		playlistsListPlaceholder.addEventListener('click', function(e) {
		    var target = e.target;
		    if (target !== null && target.classList.contains('load')) {
	        e.preventDefault();
	        sp_user = target.getAttribute('data-owner');
	        sp_playlist = target.getAttribute('data-id');
	        sp_frameUrl = 'https://embed.spotify.com/?uri=spotify:user:' + sp_user + ':playlist:' + sp_playlist + '&theme=white';
	        $('#playlist').attr('src', sp_frameUrl);
		    }
		});
	}, 300);
});