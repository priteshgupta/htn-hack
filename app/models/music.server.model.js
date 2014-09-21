'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		https = require('https');

mongoose.createConnection('mongodb://localhost/dev');
var	db = mongoose.connection;

/**
 * Music Schema
 */
var Music = mongoose.model('Music', { title: String, score: Number, uri: String });

exports.searchSong = function(body, next) {
	https.get('https://api.spotify.com/v1/search?q=' + body.trim().split(' ').join('+').toLowerCase() + '&type=artist,track&limit=1', function(res) {

	  res.on('data', function(d) {
	  	var obj = JSON.parse(d);
	  	var song = obj.tracks.items[0];

	  	if (song) {
		  	var songName = song.name + ' - ' + song.artists[0].name;
		  	var songId = song.id;

		  	var newMusic = new Music({ title: songName, score: 0, id: songId });

		  	Music.find({ title: songName }, function(err, music) {
		  		if (music.length > 0) {
		  			Music.update({ title: songName }, { $inc: { score: +1 } }, function(err, res) {
		  				if (!err) {
		  					next(newMusic);
			  				console.info('Incremented score of ' + songName);
		  				}
		  			});
		  		} else {
		  			newMusic.save(function(err, res) {
		  				if (!err) {
		  					next(newMusic);
			  				console.info('Added ' + songName);
		  				}
		  			});
		  		}
		  	});
	  	}
  	});

	}).on('error', function(e) {
	  console.error(e);
	});
};