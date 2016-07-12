"use strict";

let SongLister = require("./songMaker");
console.log("SongLister", SongLister);

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

	//initial list of songs displayed
	let currentView = "viewSongs";
	SongLister.loadSongs.getSongList();

	//filtering
	$("#filterButton").click(function(){
		SongLister.filter();
	});


});

