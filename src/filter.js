// One module is responsible for making the filtering form work. Therefore, it will need to use methods from the previous module.

// Filtering

// When the user selects an artist, only songs from that artist should appear.
// When the user selects an album, only songs from that album should appear.

"use strict";

// let loadSongs = require("./loadSongs");

let filter = function(currentList){ //create an array only with filtered songs
	// var currentList = loadSongs.getCurrentList();
	console.log("currentList", currentList);
	var filterArtist = $("#artistSelect option:selected").text();
	var filterAlbum = $("#albumSelect option:selected").text();

	var filterList = [];
	for (let i = 0; i < currentList.length; i++) {
		console.log("currentList[i].artist", currentList[i].artist);
		if (currentList[i].artist === filterArtist && currentList[i].album === filterAlbum) {
			filterList.push(currentList[i]);
		}
		// if (currentList[i].album === filterAlbum) {
		// 	filterList.push(currentList[i]);
		// }
	}
	console.log("filterList", filterList);

	// var uniqueNames = [];
	// $.each(filterList, function(i, el){
 //    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	// });
	return filterList;
};

module.exports = filter;