const myButton = document.querySelector("#my-button");
console.log(myButton);

myButton.addEventListener("click", doJump);

const duck = document.querySelector("#duck");
console.log(duck);

let clicked = false;
let displacement = 20;

function doJump() {
  //   console.log("did you just click me?");
  //   duck.style.translate = "0px 60px";
  if (clicked) {
    clicked = false;
    duck.style.translate = "0px -60px";
  } else {
    clicked = true;
    duck.style.translate = "0px 0px";
  }
  console.log(clicked);
}

// homework: make the duck jump higher when you click button, like flappy bird!
function flyHigh() {
  duck.style.translate = `0px -${displacement}px`;
  displacement = displacement + 20;
}

// KEYFRAME ANIMATIONS
// you define the animation's final effect first (CSS), then you can trigger it with JS
// you can also use JS to change the animation's properties, like duration, delay, etc.
