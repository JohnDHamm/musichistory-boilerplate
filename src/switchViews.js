//One module is responsible for showing the two views of the app (song list and song form).

"use strict";

var listViewEl = $("#main");
var addViewEl = $("#addSongSection");
var sideBarEl = $("#sidebar");

let switchViews = function(currentView) {

	if (currentView === "viewSongs") {
		listViewEl.addClass("visible").removeClass("hidden");
		addViewEl.addClass("hidden").removeClass("visible");
		sideBarEl.addClass("visible").removeClass("hidden");	
	} else {
		listViewEl.addClass("hidden").removeClass("visible");
		addViewEl.addClass("visible").removeClass("hidden");
		sideBarEl.addClass("hidden").removeClass("visible");	
	}

};


module.exports = switchViews;