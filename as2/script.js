// 1. DATA DEFINING
// Songs
const playlist = [
  {
    title: "setsujoushort",
    artist: "RAMINE",
    url: "https://file.garden/afccNF_qMXpg-KIC/setsujoushort.mp3",
  },
  {
    title: "Bishop",
    artist: "RAMINE",
    url: "https://file.garden/afccNF_qMXpg-KIC/bishop.mp3",
  },
  {
    title: "Skimsnow",
    artist: "RAMINE",
    url: "https://file.garden/afccNF_qMXpg-KIC/skimsnow.mp3",
  },
  {
    title: "Hatsukoi",
    artist: "RAMINE",
    url: "https://file.garden/afccNF_qMXpg-KIC/hatsukoi.mp3",
  },
  {
    title: "Negaiboshi",
    artist: "RAMINE",
    url: "https://file.garden/afccNF_qMXpg-KIC/negaiboshi.mp3",
  },
];
// const: unchanged values

// Icons
const icons = {
  play: "https://img.icons8.com/ios-glyphs/30/play--v2.png",
  pause: "https://img.icons8.com/ios-glyphs/30/pause--v1.png",
  mute: "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png",
  unmute: "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png",
};

const audio = new Audio();
// creates invisible audio player
let currentSongIndex = 0;
// track current song in playlist
// let: changeable values
// ============================================================

// 2. GET DOM ELEMENTS
// Media Player buttons
const playBtn = document.getElementById("play-pause-button");
const playImg = document.getElementById("play-pause-img");
const muteBtn = document.getElementById("mute-unmute-button");
const muteImg = document.getElementById("mute-unmute-img");
const forwardBtn = document.getElementById("fast-forward-button");
const reverseBtn = document.getElementById("reverse-button");

// Progress bar and time display
const timeline = document.getElementById("timeline");
const progressFill = document.getElementById("progress-fill");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

// now-playing text (song title, artist) and all song bars
const currentTitleText = document.querySelector(".md-title");
const currentArtistText = document.querySelector(".md-artist");
const songBars = document.querySelectorAll(".song-bar");
/* querySelector: used because these are classes, not ids.
helps grab ALL elements of the same class at once */
// ============================================================

// 3. WRITE FUNCTIONS
// load song from index number
function loadSong(index) {
  const song = playlist[index];
  // grab song from playlist array
  audio.src = song.url;
  // points the invisible audio player at that song's url
  currentTitleText.innerText = song.title;
  currentArtistText.innerText = song.artist;
  // updates the now-playing song name and artist on media player

  songBars.forEach((bar, i) => {
    if (i === index) bar.classList.add("active");
    else bar.classList.remove("active");
  });
  // if/else: running conditions
  // classList: connecting css classes with html elements
  // active add/remove: highlight/unhighlight the song bar that is playing
}

// converts raw seconds into a readable time format
function formatTime(seconds) {
  if (!seconds) return "0:00";
  // if no duration loaded yet, show 0:00
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  // remaining minutes and seconds
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  // adds leading zero (ex: "1:05" not "1:5")
}

// moves to next song, loops back to first song after the last one
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  // % playlist.length: makes it wrap around instead of going out of bounds
  loadSong(currentSongIndex);
  audio.play();
  playImg.src = icons.pause;
  // swap icon to pause as song is now playing
}

// moves to previous song, loops back to last song if already at the first
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  // + playlist.length: stops the index going negative
  loadSong(currentSongIndex);
  audio.play();
  playImg.src = icons.pause;
}
// ============================================================

// 4. ADD EVENT LISTENERS
// pause or play audio, initial state is pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playImg.src = icons.pause;
  } else {
    audio.pause();
    playImg.src = icons.play;
  }
  // change icons depend on audio is playing or not
});

// mute/unmute audio, timeline still running
muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteImg.src = audio.muted ? icons.mute : icons.unmute;
  // !: flip the value by itself (if/else not needed) (means opposite)
});

// run next song or previous song
forwardBtn.addEventListener("click", nextSong);
reverseBtn.addEventListener("click", prevSong);

// auto show every second the song is playing
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  // calculates how far through the song is as a percentage
  if (progressFill) progressFill.style.width = percent + "%";
  // progressFill: sets the progress bar width to that percentage
  if (currentTimeDisplay)
    currentTimeDisplay.innerText = formatTime(audio.currentTime);
  // currentTimeDisplay: updates on current audio time
});

// show song total duration
audio.addEventListener("loadedmetadata", () => {
  if (durationDisplay) durationDisplay.innerText = formatTime(audio.duration);
  // durationDisplay: total song length shown on screen
});

// jump to audio's point on click
timeline.addEventListener("click", (e) => {
  const rect = timeline.getBoundingClientRect();
  // gets the exact position of the timeline bar (media player)
  const clickX = e.clientX - rect.left;
  // calculates length from left edge
  const width = rect.width;
  // total width of timeline bar
  if (width > 0 && audio.duration) {
    audio.currentTime = (clickX / width) * audio.duration;
    // converts the click position into a time and jumps the audio there
  }
});

// load and play songs on click
songBars.forEach((bar, index) => {
  bar.addEventListener("click", () => {
    currentSongIndex = index;
    // update tracker to remember which song is now active
    loadSong(index);
    audio.play();
    playImg.src = icons.pause;
    // swap icon to pause since song plays automatically on click
  });
});

// automatically move to the next song when one finished playing
audio.addEventListener("ended", nextSong);

// Load first song when web first opened (always goes last  after all functions are defined)
// loadSong(currentSongIndex);
// im blocking out this line because i wanna communicate which section is the song name and artist name when new users just walk in, but keeping this line for future referencing.
// ============================================================

/* i had so much trouble learning JS, mostly of the new language not using common words like css and html. 
i am learning by formatting each steps i need to do in order to keep my codes organized.
To my knowledge then JS could be break down as:
1. Data defining: creating things in JS from scratch (ex: making playlist and icons, creating invisible audio player and tracking it) 
2. Get DOM Elements: get ids and classes defined in HTML
3. Write functions
4. Add Event Listeners: connect user interactions to functions
*/
