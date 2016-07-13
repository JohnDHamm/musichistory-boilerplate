(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

let SongLister = require("./songMaker");
// let loadSongs = require("./loadSongs");
// console.log("SongLister", SongLister);

$(document).ready(function() {

	// toggle views with nav bar links for view list and add song
	$("#viewSongs").click(function(){
		SongLister.switchViews("viewSongs");
	});
	$("#addSong").click(function(){
		SongLister.switchViews("addSongs");
	});

	// add new song button
	$("#addSongBtn").click(function(){
		SongLister.loadSongs.addSong();
		SongLister.switchViews("viewSongs");
	});

	//filtering
	$("#filterBtn").click(function(){
		var filteredList = SongLister.filter();
		// console.log("testList", testList);
		// SongLister.displaySongs(filteredList, "filtered");
		displaySongList(filteredList, "filtered");
	});

	var listViewEl = $("#main");
	var addViewEl = $("#addSongSection");
	var sideBarEl = $("#sidebar");

	// loading songs
	var songList = []; //hold array of all songs
	var song2List = []; //to hold the 2nd json of songs
	var songsAdded = false; //determine if 2nd set of songs have been loaded


	// update select dropdowns with current artists and albums
	function updateFilterSelects(list, type){
		// var listLength = list.length;
		if (type !== "filtered") { //do not update selects if filtering
			var artistsArray = [];
			var albumArray = [];
			$("#artistSelect").empty(); //clear artists select dropdown
			// $("#artistSelect").append(`<option disabled selected>select artist</option>`); //add select notification
			for (var i = 0; i < list.length; i++) {
				artistsArray.push(list[i].artist);
				$("#artistSelect").append(`<option>${list[i].artist}</option>`);

			}$("#albumSelect").empty(); //clear album select dropdown
			// $("#albumSelect").append(`<option disabled selected>select album</option>`); //add select notification
			for (let i = 0; i < list.length; i++) {
				artistsArray.push(list[i].artist);
				$("#albumSelect").append(`<option>${list[i].album}</option>`);
			}
		}
	}

	function deleteSong(clickedButton) {
		// console.log("songList", songList);
		var clickedBtnID = event.target.id.split("--")[1]; //get ID # of clicked delete button

		console.log("clickedBtnID", clickedBtnID);
		songList.splice(clickedBtnID, 1); //remove 
		console.log("songList", songList);
		displaySongList(songList, "current");
	}


	let displaySongList = function (list, type) { //could be current list or filtered list type
		listViewEl.empty();
		console.log("display list", list);
		for (var i = 0; i < list.length; i++) { //add each song to the DOM
			listViewEl.append(`<section id="section--${i}" class="song"><h2 class="songName">${list[i].title}</h2><p class="artistName">${list[i].artist}</p><p class="albumName">${list[i].album}</p><button id="delBtn--${i}" class="delBtns">Delete Song</button></section>`);
		}

		if (songsAdded === false) { //if 2nd set of songs has not been added yet, add button for more songs
			listViewEl.append(`<div id="more"><button id="moreButton">More songs</button></div>`);
			$("#moreButton").on("click", addMoreSongs);
		}

		// $(document).on("click", ".delBtns", deleteSong); //adds listeners to all delete buttons
		$(".delBtns").on("click", deleteSong);
		updateFilterSelects(list, type);
	};

	function addMoreSongs () {
		var moreSongs = SongLister.loadSongs.getMoreSongs();
		console.log("moreSongs", moreSongs);
		for (let i = 0; i < moreSongs.length; i++) { //add new songs from 2nd JSON to current song list array
			var newSongObject = moreSongs[i];
			songList.push(newSongObject);
			console.log("songList", songList);
		}
	}












	//initial list of songs displayed
	let currentView = "viewSongs";

	SongLister.loadSongs.getSongList().
		then(function(data1){
			songList = data1.songs;
			console.log("songList", songList);
			displaySongList(songList, "current");
		});

	// songList = loadSongs.getSongList(); //use promise .then
	// console.log("songList", songList);
  // console.log("loadSongs list", songList);




});


},{"./songMaker":4}],2:[function(require,module,exports){
// One module is responsible for making the filtering form work. Therefore, it will need to use methods from the previous module.

// Filtering

// When the user selects an artist, only songs from that artist should appear.
// When the user selects an album, only songs from that album should appear.

"use strict";

let loadSongs = require("./loadSongs");

let filter = function(){ //create an array only with filtered songs
	var currentList = loadSongs.getCurrentList();
	console.log("currentList", currentList);
	var filterArtist = $("#artistSelect option:selected").text();
	var filterAlbum = $("#albumSelect option:selected").text();

	var filterList = [];
	for (let i = 0; i < currentList.length; i++) {
		console.log("currentList[i].artist", currentList[i].artist);
		if (currentList[i].artist === filterArtist) {
			filterList.push(currentList[i]);
		}
		if (currentList[i].album === filterAlbum) {
			filterList.push(currentList[i]);
		}
	}
	console.log("filterList", filterList);
	return filterList;
};

module.exports = filter;
},{"./loadSongs":3}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
"use strict";

let filter = require("./filter");
let switchViews = require("./switchViews");
let loadSongs = require("./loadSongs");
// let displaySongs = require("./displaySongs");

let SongMaker = {filter, switchViews, loadSongs};


module.exports = SongMaker;


},{"./filter":2,"./loadSongs":3,"./switchViews":5}],5:[function(require,module,exports){
//One module is responsible for showing the two views of the app (song list and song form).

"use strict";

let switchViews = function(currentView) {

	if (currentView === "viewSongs") {
		$("#main").addClass("visible").removeClass("hidden");
		$("#addSongSection").addClass("hidden").removeClass("visible");
		$("#sidebar").addClass("visible").removeClass("hidden");	
	} else {
		$("#main").addClass("hidden").removeClass("visible");
		$("#addSongSection").addClass("visible").removeClass("hidden");
		$("#sidebar").addClass("hidden").removeClass("visible");	
	}

};


module.exports = switchViews;
},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
