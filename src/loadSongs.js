// One module is responsible for loading songs from a JSON file and storing them in an array. This module should expose one method for getting the entire list of songs, and one method for adding a song to the array.

"use strict";

var listViewEl = $("#main");
var addViewEl = $("#addSongSection");
var sideBarEl = $("#sidebar");

// loading songs
var songList; //hold array of all songs
var song2List; //to hold the 2nd json of songs
var songsAdded = false; //determine if 2nd set of songs have been loaded

function displaySongList (list) {
	var listLength = list.songs.length;
	listViewEl.empty();
	for (var i = 0; i < listLength; i++) {
		listViewEl.append(`<section id="section--${i}" class="song"><h2 class="songName">${list.songs[i].title}</h2><p class="artistName">${list.songs[i].artist}</p><p class="albumName">${list.songs[i].album}</p><button id="delBtn--${i}" class="buttons">Delete Song</button></section>`);
	}
	if (songsAdded === false) { //if 2nd set of songs has not been added yet, add button for more songs
		listViewEl.append(`<div id="more"><button id="moreButton">More songs</button></div>`);
		$("#moreButton").on("click", getMoreSongs);
	}
	$(".buttons").on("click", deleteSong); //adds listeners to all delete buttons
	updateFilterSelects(list);
}

function deleteSong(clickedButton) {
	var clickedBtnID = event.target.id.split("--")[1]; //get ID # of clicked delete button
	songList.songs.splice(clickedBtnID, 1);
	displaySongList(songList);
}

function updateFilterSelects(list){
	var listLength = list.songs.length;
	var artistsArray = [];
	var albumArray = [];
	$("#artistSelect").empty(); //clear artists select dropdown
	$("#artistSelect").append(`<option disabled selected>select artist</option>`); //add select notification
	for (var i = 0; i < listLength; i++) {
		artistsArray.push(list.songs[i].artist);
		$("#artistSelect").append(`<option>${list.songs[i].artist}</option>`);

	}$("#albumSelect").empty(); //clear album select dropdown
	$("#albumSelect").append(`<option disabled selected>select album</option>`); //add select notification
	for (var i = 0; i < listLength; i++) {
		artistsArray.push(list.songs[i].artist);
		$("#albumSelect").append(`<option>${list.songs[i].album}</option>`);
	}

}


let getSongList = function(){
	$.ajax({
      url: "songs.json"
    }).done(function(data) {
    	songList = data;
    	console.log("songList", songList);
			displaySongList(songList);
			// updateFilterSelects(songList);
    });
};

let getMoreSongs = function(){
	$.ajax({
	      url: "songs2.json"
	    }).done(function(data) {
	    	song2List = data;
			for (var i = 0; i < song2List.songs.length; i++) { //add new songs from 2nd JSON to current song list array
				var newSongObject = song2List.songs[i];
				songList.songs.push(newSongObject);
			}
			songsAdded = true;
			displaySongList(songList);
			// updateFilterSelects(songList);
	    }).fail(function(xhr, status, error) {
	      reject(error);
	    });
};


let addSong = function(){
	var newSongToAdd = {};
  newSongToAdd.title = $("#newSongTitle").val();
  newSongToAdd.artist = $("#newArtist").val();
  newSongToAdd.album = $("#newAlbum").val();
  $(".newSongInput").val("");
  songList.songs.push(newSongToAdd);
 	// switchView();
	displaySongList(songList);
	// updateFilterSelects(songList);
};


module.exports = {getSongList, getMoreSongs, addSong};

