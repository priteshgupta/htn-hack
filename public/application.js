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
		        scope: 'user-read-private playlist-read-private',
		        response_type: 'token'
		    };
		    authWindow = window.open(
		        "https://accounts.spotify.com/authorize?" + toQueryString(params),
		        "Spotify",
		        'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
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

		var checkCookie = setInterval(function() {
			myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)spotau\s*\=\s*([^;]*).*$)|^.*$/, "$1");

			if (myCookie) {
				clearInterval(checkCookie);
				document.getElementById('login').remove();
		    showInfo(myCookie);
			}
		}, 200);

		function showInfo(accessToken) {
		    token = accessToken;
		    // fetch my public playlists
		    $.ajax({
		        url: 'https://api.spotify.com/v1/me',
		        headers: {
		            'Authorization': 'Bearer ' + accessToken
		        },
		        success: function(response) {         
		            var user_id = response.id.toLowerCase();         
		            $.ajax({
		                url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists',
		                headers: {
		                    'Authorization': 'Bearer ' + accessToken
		                },
		                success: function(response) {
		                    console.log(response);
		                    playlistsListPlaceholder.innerHTML = playlistsListTemplate(response.items);
		                }
		            });
		         
		            $('div#login').hide();
		            $('div#loggedin').show();
		        }
		    });
		}

		playlistsListPlaceholder.addEventListener('click', function(e) {
		    var target = e.target;
		    if (target !== null && target.classList.contains('load')) {
		        e.preventDefault();
		        var link = target.getAttribute('data-link');
		               
		        $.ajax({
		            url: link,
		            headers: {
		                'Authorization': 'Bearer ' + token
		            },
		            success: function(response) {
		                console.log(response);
		                playlistDetailPlaceholder.innerHTML = playlistDetailTemplate(response);
		            }
		        });
		    }
		});
	}, 300);
});