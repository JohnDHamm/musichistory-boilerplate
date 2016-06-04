var outputEl = document.getElementById("main");

var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";


// Each student must add one song to the beginning and the end of the array.

songs.unshift("YYZ by Rush on the album Moving Pictures");
songs.push("Driving South by The Stone Roses on Second Coming")

// console.log("songs", songs);
// Loop over the array and remove any words or characters that obviously don't belong.
for (i = 0; i < songs.length; i++) {
	songs[i] = songs[i].replace(/[^0-9a-zA-Z>\s]/g, "");
	songs[i] = songs[i].replace(/>/g, "-");  // Students must find and replace the > character in each item with a - character.
	outputEl.innerHTML += `<div class="song"> ${songs[i]} </div>`;
};


// Must add each string to the DOM in index.html in the main content area.

