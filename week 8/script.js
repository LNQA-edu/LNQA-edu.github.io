// first thing to do in js: get references to the DOM elements
const myVideo = document.querySelector("#my-video");
console.log(myVideo);

// play/pause logic ---------------------------------------------------
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);
// console.log is for debugging, it prints out the value of the variable to the console

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

playPauseButton.addEventListener("click", toggleVideo);

function toggleVideo() {
  if (myVideo.paused === true || myVideo.ended === true) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
}
// ----------------------------------------------------------------------

// mute/unmute logic ---------------------------------------------------
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

muteUnmuteButton.addEventListener("click", toggleSound);

function toggleSound() {
  if (myVideo.muted === true) {
    myVideo.muted = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  } else {
    myVideo.muted = true;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  }
}
// ----------------------------------------------------------------------

//step logic ---------------------------------------------------
const step1Button = document.querySelector("#step1-button");
console.log(step1Button);

step1Button.addEventListener("click", gotostep1);

function gotostep1() {
  myVideo.currentTime = 17.0;
}

const step2Button = document.querySelector("#step2-button");
console.log(step2Button);

step2Button.addEventListener("click", gotostep2);

function gotostep2() {
  myVideo.currentTime = 36.0;
}
// ----------------------------------------------------------------------

// likes logic ---------------------------------------------------
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

let likesCount = 0;
const likes = document.querySelector("#likes");
console.log(likes);

heartButton.addEventListener("click", showLikes);

function showLikes() {
  likesCount++;
  //   console.log(likesCount);
  likes.textContent = likesCount;
}
// ----------------------------------------------------------------------

// fullscreen logic ---------------------------------------------------
const fullscreenButton = document.querySelector("#fullscreen-button");
console.log(fullscreenButton);

fullscreenButton.addEventListener("click", goFullscreen);
myVideo.addEventListener("dblclick", goFullscreen);
// double click on the video to go fullscreen as well

function goFullscreen() {
  if (!document.fullscreenElement) {
    // the !: means "not", so this condition is true if there is no element in fullscreen
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
// ----------------------------------------------------------------------

/* when i was doing this canvas got hacked by some bums and the monitors put the app under maintenance to hide their helplessness. 
really pathetic if you ask me. us bitches doxx ourselves everyday with blowjob videos 
and tomodachi life footage of miis passionately talking about femboy hunting.
idk i hope the hackers at least put extentions on our assignments while they are at it.
Also i wanna go to the beach. */

const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

myVideo.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  console.log(myVideo.currentTime);
  let progress = Math.floor(myVideo.currentTime / myVideo.duration) * 100;
  console.log(progress);
  progressBar.style.width = progress + "%";
}
// its not interactive yet, think about how u can make it.

const videoList = [
  { id: 1, src: "stardust.mp4", name: "Stardust" },
  { id: 2, src: "zenscape.mp4", name: "Zenscape" },
  {
    id: 3,
    src: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4",
    name: "Music Video",
  },
];

const stardustButton = document.querySelector("#stardust-vid-button");
console.log(stardustButton);
stardustButton.addEventListener("click", function () {
  chooseVideo(0);
});

const zenscapeButton = document.querySelector("#zenscape-vid-button");
console.log(zenscapeButton);
zenscapeButton.addEventListener("click", function () {
  chooseVideo(1);
});

const musicvideoButton = document.querySelector("#musicvideo-vid-button");
console.log(musicvideoButton);
musicvideoButton.addEventListener("click", function () {
  chooseVideo(2);
});

function chooseVideo(id) {
  console.log(videoList[id].src);
  myVideo.src = videoList[id].src;
  myVideo.load();
  myVideo.play();
}

const msg = document.querySelector("#msg");
console.log(msg);

function chooseVideo(id) {
  console.log(videoList[id].name);
  msg.textContent = "Now playing: " + videoList[id].name;
  myVideo.src = videoList[id].src;
  myVideo.load();
  //   myVideo.play();
}
