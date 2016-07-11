"use strict";
$(document).ready(function() {

	function switchToSongsView() {
		listViewEl.addClass("visible").removeClass("hidden");
		addViewEl.addClass("hidden").removeClass("visible");
		sideBarEl.addClass("visible").removeClass("hidden");
	}


	function displaySongList (list) {
		var listLength = list.songs.length;
		listViewEl.empty();
		for (var i = 0; i < listLength; i++) {
			listViewEl.append(`<section id="section--${i}" class="song"><h2 class="songName">${list.songs[i].title}</h2><p class="artistName">${list.songs[i].artist}</p><p class="albumName">${list.songs[i].album}</p><button id="delBtn--${i}" class="buttons">Delete Song</button></section>`);
		};

		if (songsAdded === false) { //if 2nd set of songs has not been added yet, add button for more songs
			listViewEl.append(`<div id="more"><button id="moreButton">More songs</button></div>`);
			$("#moreButton").on("click", addMoreSongs);
		}

		$(".buttons").on("click", deleteSong); //adds listeners to all delete buttons
	}


	function deleteSong(clickedButton) {
		var clickedBtnID = event.target.id.split("--")[1]; //get ID # of clicked delete button
		songList.songs.splice(clickedBtnID, 1);
		displaySongList(songList);
	}


	function addMoreSongs() {
		$.ajax({
	      url: "songs2.json"
	    }).done(function(data) {
	    	song2List = data;
			for (var i = 0; i < song2List.songs.length; i++) { //add new songs from 2nd JSON to current song list array
				var newSongObject = song2List.songs[i]
				songList.songs.push(newSongObject);
			}
			songsAdded = true;
			displaySongList(songList);
	    }).fail(function(xhr, status, error) {
	      reject(error);
	    });
	}


	function addSongToList(){
	  var newSongToAdd = {};
	  newSongToAdd.title = $("#newSongTitle").val();
	  newSongToAdd.artist = $("#newArtist").val();
	  newSongToAdd.album = $("#newAlbum").val();
	  $(".newSongInput").val("");
	  songList.songs.push(newSongToAdd);
	  switchToSongsView();
		displaySongList(songList);
	}


	var listViewEl = $("#main");
	var addViewEl = $("#addSongSection");

	// toggle views with nav bar links for view list and add song
	var addSongLink = $("#addSong");
	var sideBarEl = $("#sidebar");
	$("#viewSongs").click(switchToSongsView);
	$("#addSong").click(function switchToAddSongView () {
		listViewEl.addClass("hidden").removeClass("visible");
		addViewEl.addClass("visible").removeClass("hidden");
		sideBarEl.addClass("hidden").removeClass("visible");
	});
	// add new song section
	$("#addSongBtn").click(addSongToList);  //add song button



	// loading songs
	var songList; //hold array of all songs
	var song2List; //to hold the 2nd json of songs
	var songsAdded = false; //determine if 2nd set of songs have been loaded


	$.ajax({
      url: "songs.json"
    }).done(function(data) {
    	songList = data;
    	displaySongList(songList);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
});


