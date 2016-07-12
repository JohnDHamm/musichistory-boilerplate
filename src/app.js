"use strict";

let SongLister = require("./songMaker");
console.log("SongLister", SongLister);

$(document).ready(function() {

	// toggle views with nav bar links for view list and add song
	// var addSongLink = $("#addSong");
	
	// $("#viewSongs").click(switchView("viewSongs"));
	// $("#addSong").click(switchView("addSongs"));


	// add new song section
	// $("#addSongBtn").click(addSongToList);  //add song button

	


	//initial list of songs displayed
	let currentView = "viewSongs";

	SongLister.loadSongs.getSongList();



});

