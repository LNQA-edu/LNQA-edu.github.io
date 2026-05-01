// 1. get access to the audio element -> to control it with JS
const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);
// DONT FORGET THE HASHTAGGGG!!!

// let us access the video too
const myVideo = document.querySelector("#my-video");
console.log(myVideo);

// 2. similarly, access the play button element
const playButton = document.querySelector("#play-button");
console.log(playButton);

playButton.addEventListener("click", playAudio);

function playAudio() {
  // airportAudio.play();
  myVideo.play();
  msg.textContent = "Audio is playing!";
}
// what the fuck is the msg doing

// 3. similarly, access the pause button element
const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  // airportAudio.pause();
  myVideo.pause();
  msg.textContent = "oh nu u killed audio!";
}

// 4. similarly, access the pop button element
const popSound = document.querySelector("#pop-audio");
console.log(popSound);
const popButton = document.querySelector("#pop-button");
console.log(popButton);

popButton.addEventListener("click", makeItPop);

function makeItPop() {
  popSound.play();
  msg.textContent = "Pop!";
}

// some other video attributes: controls, autoplay, poster, muted, loop, width and height, currentTime
// video methods: play, pause, load, addTextTrack, volume

// access the play pause button
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

// access the img
const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

// add click event listener to the play pause button
playPauseButton.addEventListener("click", toggleVideo);

function toggleVideo() {
  if (myVideo.paused === true || myVideo.ended === true) {
    myVideo.play();
  } else {
    myVideo.pause();
    playPauseImg.src =
      "https://img.icons8.com/?size=100&id=pSwquXkxwLD8&format=png&color=000000";
  }
}
