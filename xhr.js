var outputEl = document.getElementById("main");


function loadSongs () {
	var data = JSON.parse(event.target.responseText);
	var numSongs = data.songs.length;
	for (var i = 0; i < numSongs; i++) {
		outputEl.innerHTML += `<section id="section${i}" class="song"><h2 class="songName">${data.songs[i].title}</h2><p class="artistName">${data.songs[i].artist}</p><p class="albumName">${data.songs[i].album}</p><button id="delBtn${i}" class="buttons">Delete Song</button></section>`;
	};
	outputEl.innerHTML += `<div id="more"><button id="moreButton">More songs</button></div>`;
	var moreButtonPress = document.getElementById("moreButton");
	moreButtonPress.addEventListener("click", clickedMoreSongs);

	var buttonPress = document.getElementsByClassName("buttons");
	for (var i = 0; i < numSongs; i++) {
		buttonPress[i].addEventListener("click", deleteSong);
	};
}

function clickedMoreSongs (clickMoreButton) {
	clickMoreButton.currentTarget.parentNode.remove();
	var myRequest2 = new XMLHttpRequest();
	myRequest2.addEventListener("load", loadMoreSongs);
	myRequest2.open("GET", "songs2.json");
	myRequest2.send();
}


function loadMoreSongs() {
	var data2 = JSON.parse(event.target.responseText);
	var numSongs2 = data2.songs.length;
	for (var i = 0; i < numSongs2; i++) {
		outputEl.innerHTML += `<section id="section2-${i}" class="song"><h2 class="songName">${data2.songs[i].title}</h2><p class="artistName">${data2.songs[i].artist}</p><p class="albumName">${data2.songs[i].album}</p><button id="delBtn2-${i}" class="buttons2">Delete Song</button></section>`;
	};
	var buttonPress2 = document.getElementsByClassName("buttons2");
	for (var i = 0; i < numSongs2; i++) {
		buttonPress2[i].addEventListener("click", deleteSong);
	};
}






function deleteSong(clickedButton) {
	clickedButton.currentTarget.parentNode.remove();
}



var myRequest = new XMLHttpRequest();

myRequest.addEventListener("load", loadSongs);
myRequest.open("GET", "songs.json");
myRequest.send();

