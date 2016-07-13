// One module is responsible for loading songs from a JSON file and storing them in an array. This module should expose one method for getting the entire list of songs, and one method for adding a song to the array.

"use strict";

// let displaySongs = require("./displaySongs");

// loading songs
// var songList =[]; //hold array of all songs
// var song2List = []; //to hold the 2nd json of songs
// var songsAdded = false; //determine if 2nd set of songs have been loaded

// var catAJAX = function() {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: "../categories.json"
//     }).done(function(data) {
//     	// console.log("data", data);
//       resolve(data);
//     }).fail(function(xhr, status, error) {
//       reject(error);
//     });
//   });
// };

let getSongList = function(){
	return new Promise((resolve, reject) => {
		$.ajax({
	    url: "songs.json"
	  }).done(function(data) {
	  	console.log("data", data);
	    resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};
	    	// console.log("songs", data.songs);
// 	    	var songs = data.songs;
// 	    	return songs;   
// 	    	//  	console.log("loadSongs list", songList);
// 				// displaySongs(songList, "current");

// 				// //add button for 2nd json of more songs
// 				// $("#main").append(`<div id="more"><button id="moreButton">More songs</button></div>`);
// 				// $("#moreButton").on("click", getMoreSongs);
// 				// // updateFilterSelects(songList);
// 	    });

// };

let getMoreSongs = function(){
	$.ajax({
      url: "songs2.json"
    }).done(function(data) {
    	var songs = data.songs;
    	return songs;

    	
		// for (var i = 0; i < song2List.length; i++) { //add new songs from 2nd JSON to current song list array
		// 	var newSongObject = song2List[i];
		// 	list.push(newSongObject);
		});
		// console.log("moreSongs list", songList);
		// displaySongs(songList, "current");
		// updateFilterSelects(songList);
    // }).fail(function(xhr, status, error) {
    //   reject(error);
    // });
};


let addSong = function(){
	var newSongToAdd = {};
  newSongToAdd.title = $("#newSongTitle").val();
  newSongToAdd.artist = $("#newArtist").val();
  newSongToAdd.album = $("#newAlbum").val();
  $(".newSongInput").val("");
 //  songList.push(newSongToAdd);
 // 	// switchView();
	// displaySongs(songList, "current");
	// updateFilterSelects(songList);
};


let getCurrentList = function(){
	// return songList;
};


module.exports = {getSongList, getMoreSongs, addSong, getCurrentList};

