// --- 1. DATA: THE SONGS ---
// This is your playlist. You can add more songs here by following the same format.
const playlist = [
  {
    title: "setsujoushort",
    artist: "RAMINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Bishop",
    artist: "RAMINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Skimsnow",
    artist: "RAMINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Hatsukoi",
    artist: "RAMINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    title: "Negaiboshi",
    artist: "RAMINE",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
];

// --- 2. DATA: THE ICONS ---
// These are the URLs for your buttons. Replace them with your own PNG links if you wish.
const ICONS = {
  play: "https://img.icons8.com/ios-glyphs/30/play--v2.png",
  pause: "https://img.icons8.com/ios-glyphs/30/pause--v1.png",
  mute: "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png",
  unmute: "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png",
};

// --- 3. DOM SELECTION ---
const audio = new Audio(); // Hidden music engine
let currentSongIndex = 0; // Current song position

// Grab buttons
const playBtn = document.getElementById("play-pause-button");
const playImg = document.getElementById("play-pause-img");
const muteBtn = document.getElementById("mute-unmute-button");
const muteImg = document.getElementById("mute-unmute-img");
const forwardBtn = document.getElementById("fast-forward-button");
const reverseBtn = document.getElementById("reverse-button");

// Grab progress elements
const timeline = document.getElementById("timeline");
const progressFill = document.getElementById("progress-fill");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

// Grab text fields
const currentTitleText = document.querySelector(".md-title");
const currentArtistText = document.querySelector(".md-artist");

// Grab playlist bars
const songBars = document.querySelectorAll(".song-bar");

// --- 4. PLAYER FUNCTIONS ---

function loadSong(index) {
  const song = playlist[index];
  audio.src = song.url;
  currentTitleText.innerText = song.title;
  currentArtistText.innerText = song.artist;

  // Highlight active highlight in UI
  songBars.forEach((bar, i) => {
    if (i === index) bar.classList.add("active");
    else bar.classList.remove("active");
  });
}

function formatTime(seconds) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  audio.play();
  playImg.src = ICONS.pause;
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  audio.play();
  playImg.src = ICONS.pause;
}

// --- 5. EVENT LISTENERS ---

// Play/Pause
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playImg.src = ICONS.pause;
  } else {
    audio.pause();
    playImg.src = ICONS.play;
  }
});

// Mute
muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteImg.src = audio.muted ? ICONS.mute : ICONS.unmute;
});

// Skips
forwardBtn.addEventListener("click", nextSong);
reverseBtn.addEventListener("click", prevSong);

// Timeline Update
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  if (progressFill) progressFill.style.width = percent + "%";
  if (currentTimeDisplay)
    currentTimeDisplay.innerText = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  if (durationDisplay) durationDisplay.innerText = formatTime(audio.duration);
});

// Click Timeline to seek
timeline.addEventListener("click", (e) => {
  const width = timeline.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// Playlist Clicks
songBars.forEach((bar, index) => {
  bar.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(index);
    audio.play();
    playImg.src = ICONS.pause;
  });
});

// When song ends
audio.addEventListener("ended", nextSong);

// START
loadSong(currentSongIndex);
