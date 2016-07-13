"use strict";

let SongLister = require("./songMaker");

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
		var newSongToAdd = SongLister.loadSongs.addSong();
		songList.push(newSongToAdd);
		SongLister.switchViews("viewSongs");
		displaySongList(songList, "current");
	});

	//filtering
	$("#filterBtn").click(function(){
		var filteredList = SongLister.filter(songList);
		// console.log("testList", testList);
		// SongLister.displaySongs(filteredList, "filtered");
		displaySongList(filteredList, "filtered");
	});

	var listViewEl = $("#main");
	var addViewEl = $("#addSongSection");
	var sideBarEl = $("#sidebar");

	// loading songs variables
	var songList = []; //hold array of all songs
	var song2List = []; //to hold the 2nd json of songs
	var songsAdded = false; //determine if 2nd set of songs have been loaded

	let displaySongList = function (list, type) { //could be current list or filtered list type
		listViewEl.empty();
		for (var i = 0; i < list.length; i++) { //add each song to the DOM
			listViewEl.append(`<section id="section--${i}" class="song"><h2 class="songName">${list[i].title}</h2><p class="artistName">${list[i].artist}</p><p class="albumName">${list[i].album}</p><button id="delBtn--${i}" class="delBtns">Delete Song</button></section>`);
		}
		$(".delBtns").on("click", deleteSong);

		if (songsAdded === false) { //if 2nd set of songs has not been added yet, add button for more songs
			listViewEl.append(`<div id="more"><button id="moreButton">More songs</button></div>`);
			$("#moreButton").on("click", addMoreSongs);
		}

		if (type === "filtered") {
			listViewEl.append(`<div id="more"><button id="removeFilterBtn">Remove filter</button></div>`);
			$("#removeFilterBtn").on("click", showAll);
		}
		updateFilterSelects(list, type);
	};

	// update select dropdowns with current artists and albums
	function updateFilterSelects(list, type){
		if (type !== "filtered") { //do not update selects if filtering
			var artistsArray = [];
			var albumArray = [];
			$("#artistSelect").empty(); //clear artists select dropdown
			for (var i = 0; i < list.length; i++) {
				artistsArray.push(list[i].artist);
				$("#artistSelect").append(`<option>${list[i].artist}</option>`);

			}$("#albumSelect").empty(); //clear album select dropdown
			for (let i = 0; i < list.length; i++) {
				artistsArray.push(list[i].artist);
				$("#albumSelect").append(`<option>${list[i].album}</option>`);
			}
		}
	}

	function deleteSong(clickedButton) {
		var clickedBtnID = event.target.id.split("--")[1]; //get ID # of clicked delete button
		songList.splice(clickedBtnID, 1); //remove that song from array
		displaySongList(songList, "current");
	}

	function showAll() {  //remove filtering + show all current songs
		displaySongList(songList, "current");
	}


	function addMoreSongs () {
		SongLister.loadSongs.getMoreSongs().
		then(function(data2){
			song2List = data2.songs;
			for (let i = 0; i < song2List.length; i++) { //add new songs from 2nd JSON to current song list array
				var newSongObject = song2List[i];
				songList.push(newSongObject);
			}
			songsAdded = true;
			displaySongList(songList, "current");
		});
	}









	//initial list of songs displayed
	let currentView = "viewSongs";

	SongLister.loadSongs.getSongList().
		then(function(data1){
			songList = data1.songs;
			displaySongList(songList, "current");
		});





});

