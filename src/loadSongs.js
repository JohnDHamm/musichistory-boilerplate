// One module is responsible for loading songs from a JSON file and storing them in an array. This module should expose one method for getting the entire list of songs, and one method for adding a song to the array.

"use strict";

let getSongList = function(){
	return new Promise((resolve, reject) => {
		$.ajax({
	    url: "songs.json"
	  }).done(function(data) {
	    resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

let getMoreSongs = function(){
	return new Promise((resolve, reject) => {
		$.ajax({
	    url: "songs2.json"
	  }).done(function(data) {
	    resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

let addSong = function(){
	var newSongToAdd = {};
  newSongToAdd.title = $("#newSongTitle").val();
  newSongToAdd.artist = $("#newArtist").val();
  newSongToAdd.album = $("#newAlbum").val();
  $(".newSongInput").val("");
  return newSongToAdd;
};

module.exports = {getSongList, getMoreSongs, addSong};

