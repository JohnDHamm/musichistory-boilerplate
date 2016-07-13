//One module is responsible for showing the two views of the app (song list and song form).

"use strict";

let switchViews = function(currentView) {

	if (currentView === "viewSongs") {
		$("#main").addClass("visible").removeClass("hidden");
		$("#addSongSection").addClass("hidden").removeClass("visible");
		$("#sidebar").addClass("visible").removeClass("hidden");	
	} else {
		$("#main").addClass("hidden").removeClass("visible");
		$("#addSongSection").addClass("visible").removeClass("hidden");
		$("#sidebar").addClass("hidden").removeClass("visible");	
	}
};

module.exports = switchViews;