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
		var newSongToAdd = SongLister.loadSongs.addSong();
		songList.push(newSongToAdd);
		SongLister.switchViews("viewSongs");
		displaySongList(songList, "current");
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
		SongLister.loadSongs.getMoreSongs().
		then(function(data2){
			song2List = data2.songs;
			console.log("song2List", song2List);
			for (let i = 0; i < song2List.length; i++) { //add new songs from 2nd JSON to current song list array
				var newSongObject = song2List[i];
				songList.push(newSongObject);
			}
			console.log("songList", songList);
			displaySongList(songList, "current");
		});
	}









	//initial list of songs displayed
	let currentView = "viewSongs";

	SongLister.loadSongs.getSongList().
		then(function(data1){
			songList = data1.songs;
			console.log("songList", songList);
			displaySongList(songList, "current");
		});





});

