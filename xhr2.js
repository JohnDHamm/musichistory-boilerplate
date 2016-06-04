var outputEl = document.getElementById("main");
var firstList;

function loadSongs () {
	var data = JSON.parse(event.target.responseText);
	firstList = data;
	displaySongList(data);
}


function displaySongList (list) {
	var listLength = list.songs.length;
	outputEl.innerHTML = "";
	for (var i = 0; i < listLength; i++) {
		outputEl.innerHTML += `<section id="section${i}" class="song"><h2 class="songName">${list.songs[i].title}</h2><p class="artistName">${list.songs[i].artist}</p><p class="albumName">${list.songs[i].album}</p><button id="delBtn${i}" class="buttons">Delete Song</button></section>`;
	};
	outputEl.innerHTML += `<div id="more"><button id="moreButton">More songs</button></div>`;
	var moreButtonPress = document.getElementById("moreButton");
	moreButtonPress.addEventListener("click", clickedMoreSongs);

	var delButtonPress = document.getElementsByClassName("buttons");
	for (var j = 0; j < listLength; j++) {
		delButtonPress[j].addEventListener("click", deleteSong);
	};
}


function deleteSong(clickedButton) {
	clickedButton.currentTarget.parentNode.remove();
}


function clickedMoreSongs (clickMoreButton) {
	var myRequest2 = new XMLHttpRequest();
	myRequest2.addEventListener("load", appendList);
	myRequest2.open("GET", "songs2.json");
	myRequest2.send();
}


function appendList() {
	var newData = JSON.parse(event.target.responseText);
	// here's where need to create 1 object with array from the first and second json files
	var newList = firstList;
	for (var i = 0; i < newData.songs.length; i++) {
		var newSongObject = newData.songs[i]
		newList.songs.push(newSongObject);
	}
	displaySongList(newList);
}


var myRequest = new XMLHttpRequest();

myRequest.addEventListener("load", loadSongs);
myRequest.open("GET", "songs.json");
myRequest.send();

