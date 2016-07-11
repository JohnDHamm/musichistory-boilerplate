var outputEl = document.getElementById("main");
var addView = document.getElementById("addSongSection");
var songList; //hold array of all songs
var songsAdded = false; //determine if 2nd set of songs have been loaded

var viewSongsLink = document.getElementById("viewSongs");
viewSongsLink.addEventListener("click", switchToSongsView);
var addSongLink = document.getElementById("addSong");
addSongLink.addEventListener("click", switchToAddSongView);
var sideBarEl = document.getElementById("sidebar");

var newSongTitle = document.getElementById("newSongTitle");
var newArtist = document.getElementById("newArtist");
var newAlbum = document.getElementById("newAlbum");

var addSongBtn = document.getElementById("addSongBtn");
addSongBtn.addEventListener("click", addSongToList);

function switchToSongsView() {
	outputEl.classList.add("visible");
	outputEl.classList.remove("hidden");
	addView.classList.add("hidden");
	addView.classList.remove("visible");
	sideBarEl.classList.add("visible");
	sideBarEl.classList.remove("hidden");
}

function switchToAddSongView () {
	outputEl.classList.add("hidden");
	outputEl.classList.remove("visible");
	addView.classList.add("visible");
	addView.classList.remove("hidden");
	sideBarEl.classList.add("hidden");
	sideBarEl.classList.remove("visible");
}


function loadSongs () {
	var data = JSON.parse(event.target.responseText);
	songList = data;
	// console.log("songList", songList);
	displaySongList(songList);
}


function displaySongList (list) {
	var listLength = list.songs.length;
	outputEl.innerHTML = "";
	for (var i = 0; i < listLength; i++) {
		outputEl.innerHTML += `<section id="section--${i}" class="song"><h2 class="songName">${list.songs[i].title}</h2><p class="artistName">${list.songs[i].artist}</p><p class="albumName">${list.songs[i].album}</p><button id="delBtn--${i}" class="buttons">Delete Song</button></section>`;
	};

	if (songsAdded === false) { //if 2nd set of songs has not been added yet, add button for more songs
		outputEl.innerHTML += `<div id="more"><button id="moreButton">More songs</button></div>`;
		var moreButtonPress = document.getElementById("moreButton");
		moreButtonPress.addEventListener("click", clickedMoreSongs);
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
	var title = newSongTitle.value;
	var artist = newArtist.value;
	var album = newAlbum.value;
  var newSongToAdd = {};
  newSongToAdd.title = `${title}`;
  newSongToAdd.artist = `${artist}`;
  newSongToAdd.album = `${album}`;
  songList.songs.push(newSongToAdd);
  switchToSongsView();
	displaySongList(songList);
}



var myRequest = new XMLHttpRequest();

myRequest.addEventListener("load", loadSongs);
myRequest.open("GET", "songs.json");
myRequest.send();

