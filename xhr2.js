"use strict";


var listViewEl = $("#main");
var addViewEl = $("#addSongSection");
var songList; //hold array of all songs
var songsAdded = false; //determine if 2nd set of songs have been loaded

// toggle views with nav bar links for view list and add song
var addSongLink = $("#addSong");
var sideBarEl = $("#sidebar");
$("#viewSongs").click(switchToSongsView);
$("#addSong").click(function switchToAddSongView () {
	listViewEl.addClass("hidden").removeClass("visible");
	addViewEl.addClass("visible").removeClass("hidden");
	sideBarEl.addClass("hidden").removeClass("visible");
});

function switchToSongsView() {
	listViewEl.addClass("visible").removeClass("hidden");
	addViewEl.addClass("hidden").removeClass("visible");
	sideBarEl.addClass("visible").removeClass("hidden");
}

// add new song section
// var newSongTitle = document.getElementById("newSongTitle");
// var newArtist = document.getElementById("newArtist");
// var newAlbum = document.getElementById("newAlbum");

$("#addSongBtn").click(addSongToList);  //add song button



function loadSongs () {
	var data = JSON.parse(event.target.responseText);
	songList = data;
	// console.log("songList", songList);
	displaySongList(songList);
}


function displaySongList (list) {
	var listLength = list.songs.length;
	listViewEl.empty();
	for (var i = 0; i < listLength; i++) {
		listViewEl.append(`<section id="section--${i}" class="song"><h2 class="songName">${list.songs[i].title}</h2><p class="artistName">${list.songs[i].artist}</p><p class="albumName">${list.songs[i].album}</p><button id="delBtn--${i}" class="buttons">Delete Song</button></section>`);
	};

	if (songsAdded === false) { //if 2nd set of songs has not been added yet, add button for more songs
		listViewEl.append(`<div id="more"><button id="moreButton">More songs</button></div>`);
		// $("#moreButton").click(clickedMoreSongs());
		$("#moreButton").on("click", clickedMoreSongs);
		// var moreButtonPress = document.getElementById("moreButton");
		// moreButtonPress.addEventListener("click", clickedMoreSongs);
	}

	var delButtonPress = document.getElementsByClassName("buttons");
	for (var j = 0; j < listLength; j++) {
		delButtonPress[j].addEventListener("click", deleteSong);
	};
}


function deleteSong(clickedButton) {
	var clickedBtnID = event.target.id.split("--")[1]; //get ID # of clicked delete button
	// console.log("clicked button ID:", clickedBtnID);
	songList.songs.splice(clickedBtnID, 1);
	// console.log("songList", songList);
	// clickedButton.currentTarget.parentNode.remove();
	displaySongList(songList);
}


function clickedMoreSongs (clickMoreButton) {
	var myRequest2 = new XMLHttpRequest();
	myRequest2.addEventListener("load", appendList);
	myRequest2.open("GET", "songs2.json");
	myRequest2.send();
}


function appendList() {
	var newData = JSON.parse(event.target.responseText);
	for (var i = 0; i < newData.songs.length; i++) { //add new songs from 2nd JSON to current song list array
		var newSongObject = newData.songs[i]
		songList.songs.push(newSongObject);
	}
	songsAdded = true;
	displaySongList(songList);
}

function addSongToList(){
  var newSongToAdd = {};
  newSongToAdd.title = $("#newSongTitle").val();
  newSongToAdd.artist = $("#newArtist").val();
  newSongToAdd.album = $("#newAlbum").val();
  songList.songs.push(newSongToAdd);
  switchToSongsView();
	displaySongList(songList);
}



var myRequest = new XMLHttpRequest();

myRequest.addEventListener("load", loadSongs);
myRequest.open("GET", "songs.json");
myRequest.send();

