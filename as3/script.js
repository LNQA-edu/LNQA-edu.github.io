// 1. DATA DEFINING
// Timer bar
let autoTimer = null;
// null: intendedly absent element
let countdownInterval;
let textboxClickHandler = null;
// tracks active click handler for cleanup (hide textbox)

// Audios
let bgm, darkBgm, laughSfx, gameSfx, otherSfx;

// Scenes
const scenes = {
  start: {
    background: "light-bg.png",
    lines: [
      {
        text: "Hello, it's good to finally meet you.",
        sprite: "neutral-sprite.png",
      },
      {
        text: "Oh you are adorable! I'm glad it's you who is aiding me.",
        sprite: "happy-sprite.png",
        bounce: true,
      },
      {
        text: "Let's save the world together by defeating evil, in the name of justice.",
        sprite: "happy-sprite.png",
      },
    ],
    choices: [
      { text: "Yes", next: "end" },
      { text: "Who are you?", next: "scene2" },
    ],
  },
  scene2: {
    background: "light-bg.png",
    lines: [
      {
        text: "",
        sprite: "happy-sprite.png",
        // i acknowledge my academic shortcomings of my dialogues gone missing when starting a new scene
      },
      {
        text: "I am your best Magical Girl, beacon of Justice, always ready to save the day!",
        sprite: "happy-sprite.png",
      },
      {
        text: "Let us save the world against the force of evil.",
        sprite: "neutral-sprite.png",
      },
    ],
    choices: [
      { text: "Yes", next: "end" },
      { text: "What do you mean by 'evil'?", next: "scene3" },
    ],
  },
  scene3: {
    background: "light-bg.png",
    lines: [
      { text: "", sprite: "happy-sprite.png" },
      { text: "Not what - it's who, silly!", sprite: "happy-sprite.png" },
      {
        text: "And who else could I mean if not this whole planet's people.",
        sprite: "neutral-sprite.png",
      },
      {
        text: "All those who take breaths, aside from you and me. They are those who give evil a meaning.",
        sprite: "neutral-sprite.png",
      },
      {
        text: "I want to take them all down. That's why I called for your help.",
        sprite: "neutral-sprite.png",
      },
    ],
    choices: [
      { text: "Yes", next: "end" },
      { text: "What have they done that was so evil?", next: "scene4" },
    ],
  },
  scene4: {
    background: "light-bg.png",
    lines: [
      {
        text: "",
        sprite: "neutral-sprite.png",
      },
      {
        text: "I'm afraid we do not have time for this, but if you must know…",
        sprite: "neutral-sprite.png",
      },
      { text: "What have they not done?", sprite: "angry-sprite.png" },
      {
        text: "The last representation of Justice was lost by their hand, simply just because she could not save a civilian out of a million that she had.",
        sprite: "angry-sprite.png",
      },
      {
        text: "They hurled insults at her publicly, or on any media they could. Even when she had done everything to make herself smaller, they still found ways to hurt her.",
        sprite: "angry-sprite.png",
      },
      {
        text: "They turned on her the moment she stumbled. It is only sensible to think that evil representations are those who destroy justice.",
        sprite: "angry-sprite.png",
      },
      {
        text: "Again, I request for a stop to this conversation, and to them.",
        sprite: "neutral-sprite.png",
      },
    ],
    choices: [
      { text: "Yes", next: "end" },
      { text: "That's not enough to end people.", next: "scene5" },
    ],
  },
  scene5: {
    background: "light-bg.png",
    lines: [
      {
        text: "",
        sprite: "angry-sprite.png",
        background: "light-bg.png",
      },
      {
        text: "When will it be enough then? When they finally have the slightest ounce of mercy to just shut up?",
        sprite: "angry-sprite.png",
        background: "light-bg.png",
      },
      {
        text: "Or when they got their sick satisfaction in seeing my sister hang on a rope?",
        sprite: "angry-sprite.png",
        background: "dark-bg.png",
      },
      {
        text: "As lovely as you are to me, you are pretty dense.",
        sprite: "angry-sprite.png",
        background: "dark-bg.png",
      },
      {
        text: "But it is fine. All is fine, all will be fine, if you could lend me your aid.",
        sprite: "neutral-sprite.png",
        background: "dark-bg.png",
      },
    ],
    choices: [
      { text: "Yes", next: "end" },
      { text: "No", next: "scene6" },
    ],
  },
  scene6: {
    background: "dark-bg.png",
    lines: [
      {
        text: "",
        sprite: "angry-sprite.png",
      },
      {
        text: "Actually, you don't have a say in this.",
        sprite: "angry-sprite.png",
      },
      { text: "I am not asking.", sprite: "angry-sprite.png", hideBox: true }, // hides textbox, showcasing the axe
      {
        text: "But I am giving you a choice. It is my last ounce of hospitality, like the Magical Girl teachings they like to stuff in our heads.",
        sprite: "neutral-sprite.png",
      },
      { text: "Just click a damn button.", sprite: "neutral-sprite.png" },
      { text: "Now.", sprite: "angry-sprite.png" },
    ],
    choices: [
      { text: "YES", next: "end" },
      { text: "YES", next: "end" }, // both choices lead same place
    ],
    timed: true, // triggers countdown when choices appear
    timer: 2, // seconds before auto-selecting
  },
  end_forced: {
    background: "dark-bg.png",
    lines: [
      {
        text: "",
        sprite: "happy-sprite.png",
      },
      {
        text: "They are both the same thing dummy. What is taking you so long then, haha.",
        sprite: "happy-sprite.png",
      },
    ],
    choices: [],
    nextScene: "end",
  },
  end: {
    background: "dark-bg.png",
    lines: [
      {
        text: "",
        sprite: "neutral-sprite.png",
      },
      {
        text: "It doesn't matter what you choose anyways.",
        sprite: "neutral-sprite.png",
      },
      { text: "Nothing matters, not anymore.", sprite: "angry-sprite.png" },
      { text: "Come on now.", cg: "cg-art.png" },
      { text: "Let us defeat evil, in the name of Justice.", cg: "cg-art.png" },
    ],
    choices: [],
  },
};

// 2. GET DOM ELEMENTS
const background = document.getElementById("background");
const sprite = document.getElementById("sprite");
const cgArt = document.getElementById("cg-art");
const textbox = document.getElementById("textbox");
const dialogue = document.getElementById("dialogue");
const choices = document.getElementById("choices");
const timerBarContainer = document.getElementById("timer-bar-container");
const timerBar = document.getElementById("timer-bar");

// 3. WRITE FUNCTIONS
// resets state and loads a new scene
function showScene(sceneId) {
  clearTimeout(autoTimer);
  autoTimer = null;

  // remove previous textbox click handler
  if (textboxClickHandler) {
    textbox.removeEventListener("click", textboxClickHandler);
    textboxClickHandler = null;
  }

  const scene = scenes[sceneId];

  // reset visuals
  if (sceneId === "scene5") {
    bgm.pause();
    bgm.currentTime = 0;
  }
  if (sceneId === "end") {
    bgm.pause();
    bgm.currentTime = 0;
    darkBgm.pause();
    darkBgm.currentTime = 0;
    darkBgm.play();
  }

  sprite.style.display = "block";
  sprite.classList.remove("bounce");
  cgArt.style.opacity = "0";
  cgArt.style.display = "none";
  cgArt.src = "";
  textbox.style.display = "block";
  textbox.style.background = ""; // reset transparency
  dialogue.textContent = "";
  choices.innerHTML = "";
  timerBarContainer.style.display = "none";
  timerBar.style.width = "100%";

  let lineIndex = 0;

  function showLine() {
    if (lineIndex >= scene.lines.length) {
      // all lines done, show choices
      showChoices(scene);
      return;
    }

    const line = scene.lines[lineIndex];
    dialogue.textContent = line.text + " ▶";

    if (line.sprite) sprite.src = line.sprite;

    if (line.bounce) {
      sprite.classList.add("bounce");
    } else {
      sprite.classList.remove("bounce");
    }

    if (line.background) background.src = line.background;

    if (line.cg) {
      if (cgArt.style.display === "none") {
        // only runs on first cg line
        laughSfx.currentTime = 0;
        laughSfx.play();
      }
      cgArt.src = line.cg;
      cgArt.style.opacity = "0";
      cgArt.style.display = "block";
      setTimeout(function () {
        cgArt.style.opacity = "1";
      }, 50);
      sprite.style.display = "none";
      textbox.style.background = "rgba(255, 237, 241, 0.8)"; // semi-transparent to showcase cg art
    }

    choices.innerHTML = "";

    if (line.hideBox) {
      // hide textbox and shake screen, reveal on next click
      textbox.style.display = "none";
      document.getElementById("game-screen").classList.add("shake");
      setTimeout(function () {
        document.getElementById("game-screen").classList.remove("shake");
      }, 500);
      lineIndex++;
      document.addEventListener(
        "click",
        function revealBox() {
          textbox.style.display = "block";
          document.removeEventListener("click", revealBox);
        },
        { once: true, capture: true },
      );
    } else {
      lineIndex++;
    }
  }

  // attach new click handler
  textboxClickHandler = function () {
    if (choices.children.length === 0) {
      showLine();
    }
  };
  textbox.addEventListener("click", textboxClickHandler);

  showLine(); // show first line immediately
}

// renders choice buttons and handles timed scenes
function showChoices(scene) {
  if (!scene.choices || scene.choices.length === 0) {
    let advancing = false;
    if (textboxClickHandler) {
      textbox.removeEventListener("click", textboxClickHandler);
    }
    textboxClickHandler = function () {
      if (advancing) return;
      advancing = true;
      textbox.removeEventListener("click", textboxClickHandler);
      scene.nextScene ? showScene(scene.nextScene) : showCredits();
    };
    textbox.addEventListener("click", textboxClickHandler);
    return;
  }

  // set timer BEFORE creating buttons
  // timed choices to create tension
  if (scene.timed) {
    timerBarContainer.style.display = "block";
    timerBar.style.transition = `width ${scene.timer}s linear`;
    timerBar.style.width = "100%";
    setTimeout(function () {
      timerBar.style.width = "0%";
    }, 50);

    autoTimer = setTimeout(function () {
      if (autoTimer === null) return;
      // player clicked in time then it would do nothing
      timerBarContainer.style.display = "none";
      timerBar.style.width = "100%";
      choices.innerHTML = "";
      showScene("end_forced");
    }, scene.timer * 1000);
  }

  //  THE CORRECTION: The choices loop belongs INSIDE the function here!
  // CHOICES BUTTON
  scene.choices.forEach(function (choice) {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.className = "choice-button";
    if (scene.timed) btn.classList.add("shiver"); // shiver animation on timed choices
    btn.addEventListener("click", function () {
      gameSfx.currentTime = 0;
      gameSfx.play();
      const timerToClear = autoTimer;
      autoTimer = null;
      clearTimeout(timerToClear);
      timerBarContainer.style.display = "none";
      timerBar.style.width = "100%";
      showScene(choice.next);
    });
    choices.appendChild(btn);
  });
} // This curly bracket cleanly finishes showChoices

// SCREEN TRANSITIONS
// hides one screen and reveals another
function switchScreen(hideId, showId) {
  document.getElementById(hideId).style.display = "none";
  document.getElementById(showId).style.display = "flex";
}

// CREDITS PAGE
// shows credits screen and resets sprite visibility
function showCredits() {
  darkBgm.pause();
  darkBgm.currentTime = 0;
  if (textboxClickHandler) {
    textbox.removeEventListener("click", textboxClickHandler);
    // clean up listener before leaving
    textboxClickHandler = null;
  }
  switchScreen("game-screen", "credits-screen");
  sprite.style.display = "block";
}

// 4. ADD EVENT LISTENERS
// audio created inside click so audios loads without being blocked
document.getElementById("start-button").addEventListener("click", function () {
  // happy bgm
  bgm = new Audio(
    "https://file.garden/afccNF_qMXpg-KIC/geoffharvey-magical-storytime-389087.mp3",
  );
  bgm.loop = true;
  bgm.volume = 0.1;

  // creepy bg,
  darkBgm = new Audio("https://file.garden/afccNF_qMXpg-KIC/hatsukoi.mp3");
  darkBgm.loop = true;
  darkBgm.volume = 0.1;

  // very pretty laughter <3
  laughSfx = new Audio(
    "https://file.garden/afccNF_qMXpg-KIC/dragon-studio-witch-laugh-401713.mp3",
  );
  laughSfx.volume = 0.15;

  // pink buttons's sound
  gameSfx = new Audio(
    "https://file.garden/afccNF_qMXpg-KIC/freesound_gamestudio-button-394464.mp3",
  );
  gameSfx.volume = 0.5;

  // not pink buttons's sound
  otherSfx = new Audio(
    "https://file.garden/afccNF_qMXpg-KIC/lucadialessandro-shooting-sound-fx-159024.mp3",
  );
  otherSfx.volume = 0.5;

  // plays happy music at beginning of game
  gameSfx.play();
  bgm.play();
  switchScreen("start-screen", "game-screen");
  showScene("start");
});

// MAIN MENU BUTTON
document.getElementById("menu-button").addEventListener("click", function () {
  otherSfx.currentTime = 0;
  otherSfx.play();
  // play sfx of the button on click action
  switchScreen("credits-screen", "restart-screen");
});

// RESTART BUTTON
document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    gameSfx.currentTime = 0;
    gameSfx.play();
    darkBgm.pause();
    darkBgm.currentTime = 0;
    bgm.currentTime = 0;
    bgm.play();
    background.src = "light-bg.png";
    // Reset the background image back to the start state
    switchScreen("restart-screen", "game-screen");
    showScene("start");
  });

// EXTRA BUTTON
document.getElementById("extra-button").addEventListener("click", function () {
  otherSfx.currentTime = 0;
  otherSfx.play();
  document.getElementById("extras-popup").style.display = "flex";
});

// CLOSE EXTRAS
document.getElementById("close-extras").addEventListener("click", function () {
  otherSfx.currentTime = 0;
  otherSfx.play();
  document.getElementById("extras-popup").style.display = "none";
  // display:none so popup disappear when button is clicked
});

// CREDITS BUTTON
document
  .getElementById("credits-button")
  .addEventListener("click", function () {
    otherSfx.currentTime = 0;
    otherSfx.play();
    switchScreen("restart-screen", "credits-screen");
  });

/* I ackowledge my academic shortcomings regarding coding. 
  I think as I was too immersed in writing and visual designing that my coding skills might be quite underperformed, 
  combining with some personal matters on time constrains and skill shortcoming on coding, 
  that gives me less chances to practice iterations on creative coding.
  Although, I appreciated this assignment given me some insights on cued functions 
  (buttons that comes with audios, scenes and assets rendering on clicks) 
  and animations that could be activated either through css or jvs.
  */
