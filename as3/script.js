// holds timer references so they can be cancelled if player clicks in time
let autoTimer = null;
let countdownInterval;

// --- DATA: SCENES ---
const scenes = {
  start: {
    background: "light-bg.png",
    lines: [
      //   {
      //     text: "Hello, it's good to finally meet you.",
      //     sprite: "neutral-sprite.png",
      //   },
      //   {
      //     text: "Oh you are adorable! I'm glad it's you who is aiding me.",
      //     sprite: "happy-sprite.png",
      //     bounce: true,
      //   },
      {
        text: "Let's save the world together by defeating evil, in the name of justice.",
        sprite: "happy-sprite.png",
      },
    ],
    choices: [
      { text: "Yes", next: "end" },
      { text: "Who are you?", next: "scene6" },
    ],
  },
  // scene2: {
  //   background: "light-bg.png",
  //   lines: [
  //     {
  //       text: "I am your best Magical Girl, beacon of Justice, always ready to save the day!",
  //       sprite: "happy-sprite.png",
  //     },
  //     {
  //       text: "Let us save the world against the force of evil.",
  //       sprite: "neutral-sprite.png",
  //     },
  //   ],
  //   choices: [
  //     { text: "Yes", next: "end" },
  //     { text: "What do you mean by 'evil'?", next: "scene3" },
  //   ],
  // },
  // scene3: {
  //   background: "light-bg.png",
  //   lines: [
  //     { text: "Not what - it's who, silly!", sprite: "happy-sprite.png" },
  //     {
  //       text: "And who else could I mean if not this whole planet's people.",
  //       sprite: "neutral-sprite.png",
  //     },
  //     {
  //       text: "All those who take breaths, aside from you and me. They are those who give evil a meaning.",
  //       sprite: "neutral-sprite.png",
  //     },
  //     {
  //       text: "I want to take them all down. That's why I called for your help.",
  //       sprite: "neutral-sprite.png",
  //     },
  //   ],
  //   choices: [
  //     { text: "Yes", next: "end" },
  //     { text: "What have they done that was so evil?", next: "scene4" },
  //   ],
  // },
  // scene4: {
  //   background: "light-bg.png",
  //   lines: [
  //     {
  //       text: "I'm afraid we do not have time for this, but if you must know…",
  //       sprite: "neutral-sprite.png",
  //     },
  //     {
  //       text: "What have they not done?",
  //       sprite: "angry-sprite.png",
  //       background: "light-bg.png",
  //     },
  //     {
  //       text: "The last representation of Justice was lost by their hand, simply just because she could not save a civilian out of a million that she had.",
  //       sprite: "angry-sprite.png",
  //       background: "light-bg.png",
  //     },
  //     {
  //       text: "They hurled insults at her publicly, or on any media they could. Even when she had done everything to make herself smaller, they still found ways to hurt her.",
  //       sprite: "angry-sprite.png",
  //       background: "light-bg.png",
  //     },
  //     {
  //       text: "They turned on her the moment she stumbled. It is only sensible to think that evil representations are those who destroy justice.",
  //       sprite: "angry-sprite.png",
  //       background: "light-bg.png",
  //     },
  //     {
  //       text: "Again, I request for a stop to this conversation, and to them.",
  //       sprite: "neutral-sprite.png",
  //       background: "light-bg.png",
  //     },
  //   ],
  //   choices: [
  //     { text: "Yes", next: "end" },
  //     { text: "That's not enough to end people.", next: "scene5" },
  //   ],
  // },
  // scene5: {
  //   background: "dark-bg.png",
  //   lines: [
  //     {
  //       text: "When will it be enough then? When they finally have the slightest ounce of mercy to just shut up?",
  //       sprite: "neutral-sprite.png",
  //       background: "light-bg.png",
  //     },
  //     {
  //       text: "Or when they got their sick satisfaction in seeing my sister hang on a rope?",
  //       sprite: "angry-sprite.png",
  //       background: "dark-bg.png",
  //     },
  //     {
  //       text: "As lovely as you are to me, you are pretty dense.",
  //       sprite: "angry-sprite.png",
  //       background: "dark-bg.png",
  //     },
  //     {
  //       text: "But it is fine. All is fine, all will be fine, if you could lend me your aid.",
  //       sprite: "neutral-sprite.png",
  //       background: "light-bg.png",
  //     },
  //   ],
  //   choices: [
  //     { text: "Yes", next: "end" },
  //     { text: "No", next: "scene6" },
  //   ],
  // },
  scene6: {
    background: "dark-bg.png",
    lines: [
      {
        text: "Actually, you don't have a say in this.",
        sprite: "angry-sprite.png",
      },
      {
        text: "I am not asking.",
        sprite: "angry-sprite.png",
        hideBox: true, // hides dialogue box, showcasing the axe before the text appears again
      },
      {
        text: "But I am giving you a choice. It is my last ounce of hospitality, like the Magical Girl teachings they like to stuff in our heads.",
        sprite: "neutral-sprite.png",
      },
      { text: "Just click a damn button.", sprite: "neutral-sprite.png" },
      { text: "Now.", sprite: "angry-sprite.png" },
    ],
    choices: [
      { text: "YES", next: "end" },
      { text: "YES", next: "end" }, // both choices lead same place *<:^)
    ],
    timed: true, // triggers countdown when choices appear
    timer: 2, // seconds before auto-selecting
  },
  end_forced: {
    background: "dark-bg.png",
    lines: [
      {
        text: "They are both the same thing dummy. What is taking you so long then, haha.",
        sprite: "happy-sprite.png",
      },
    ],
    choices: [], // no choices, click next to continue
    nextScene: "end",
  },
  end: {
    background: "dark-bg.png",
    lines: [
      { text: "It doesn't matter anyway.", sprite: "neutral-sprite.png" },
      { text: "Nothing matters, not anymore.", sprite: "angry-sprite.png" },
      { text: "Come on now.", cg: "cg-art.png" },
      {
        text: "Let us defeat evil, in the name of Justice.",
        cg: "cg-art.png",
      },
    ],
    choices: [],
  },
};

// --- GRAB ELEMENTS ---
// stored as variables to avoid querying the DOM repeatedly
const background = document.getElementById("background");
const sprite = document.getElementById("sprite");
const cgArt = document.getElementById("cg-art");
const dialogue = document.getElementById("dialogue");
const choicesDiv = document.getElementById("choices");
const timerBarContainer = document.getElementById("timer-bar-container");
const timerBar = document.getElementById("timer-bar");
const textbox = document.getElementById("textbox");

// --- SHOW SCENE ---
// loads a scene by id, renders first line, sets up textbox click to advance

function showScene(sceneId) {
  clearTimeout(autoTimer);
  autoTimer = null;
  const scene = scenes[sceneId];
  background.src = scene.background;
  cgArt.style.opacity = "0";
  cgArt.style.display = "none";
  cgArt.src = "";
  sprite.style.display = "block";

  const currentTextboxEl = document.getElementById("textbox");
  currentTextboxEl.replaceWith(currentTextboxEl.cloneNode(true));
  const freshTextbox = document.getElementById("textbox");
  const freshChoices = freshTextbox.querySelector("#choices");
  const freshDialogue = freshTextbox.querySelector("#dialogue");
  const freshTimerContainer = freshTextbox.querySelector(
    "#timer-bar-container",
  );
  const freshTimerBar = freshTextbox.querySelector("#timer-bar");
  freshTextbox.style.display = "block";
  freshChoices.innerHTML = "";

  let lineIndex = 0;
  let isAdvancing = false; // prevents double-firing on click

  function showLine() {
    if (isAdvancing) return; // block if already moving

    if (lineIndex < scene.lines.length) {
      const line = scene.lines[lineIndex];
      freshDialogue.textContent = line.text + " ▶";

      if (line.sprite) sprite.src = line.sprite;

      if (line.bounce) {
        sprite.classList.add("bounce");
      } else {
        sprite.classList.remove("bounce");
      }

      if (line.background) background.src = line.background;

      if (line.cg) {
        cgArt.src = line.cg;
        cgArt.style.opacity = "0";
        cgArt.style.display = "block";
        setTimeout(function () {
          cgArt.style.opacity = "1";
        }, 50);
        sprite.style.display = "none";
        freshTextbox.style.background = "rgba(255, 237, 241, 0.8)";
      }

      freshChoices.innerHTML = "";

      if (line.hideBox) {
        freshDialogue.textContent = "";
        freshTextbox.style.display = "none";
        document.getElementById("game-screen").classList.add("shake");
        setTimeout(function () {
          document.getElementById("game-screen").classList.remove("shake");
        }, 500);
        document.addEventListener(
          "click",
          function revealBox() {
            lineIndex++;
            freshTextbox.style.display = "block";
            document.removeEventListener("click", revealBox);
          },
          { once: true, capture: true },
        );
      } else {
        lineIndex++;
      }
    } else {
      freshDialogue.textContent = freshDialogue.textContent.replace(" ▶", "");
      freshChoices.innerHTML = "";
      showChoices(
        scene,
        freshTextbox,
        freshChoices,
        freshTimerContainer,
        freshTimerBar,
      );
    }
  }

  freshTextbox.addEventListener("click", function () {
    const currentChoices = document.getElementById("choices");
    if (currentChoices.children.length === 0) {
      showLine();
    }
  });

  showLine();
}

// --- SHOW CHOICES ---
// renders choice buttons, handles timed scenes and empty choice scenes
function showChoices(
  scene,
  currentTextbox,
  currentChoicesDiv,
  freshTimerContainer,
  freshTimerBar,
) {
  if (!scene.choices || scene.choices.length === 0) {
    let advancing = false; // prevents double-firing
    currentTextbox.addEventListener("click", function handler() {
      if (advancing) return;
      advancing = true;
      currentTextbox.removeEventListener("click", handler);
      scene.nextScene ? showScene(scene.nextScene) : showCredits();
    });
    return;
  }

  // timer assigned first before buttons are created
  if (scene.timed) {
    freshTimerContainer.style.display = "block";
    freshTimerBar.style.transition = `width ${scene.timer}s linear`;
    freshTimerBar.style.width = "100%";
    setTimeout(function () {
      freshTimerBar.style.width = "0%";
    }, 50);
    autoTimer = setTimeout(function () {
      if (autoTimer === null) return; // cancelled by button click, do nothing
      clearInterval(countdownInterval);
      freshTimerContainer.style.display = "none";
      freshTimerBar.style.width = "100%";
      currentChoicesDiv.innerHTML = "";
      showScene("end_forced");
    }, scene.timer * 1000);
  }

  // buttons created after timer is set
  scene.choices.forEach(function (choice) {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.className = "choice-button";
    if (scene.timed) btn.classList.add("shiver"); // shiver on timed scenes
    btn.addEventListener("click", function () {
      const timerToClear = autoTimer; // capture timer reference
      autoTimer = null; // null before clearing
      clearTimeout(timerToClear); // clear captured reference
      clearInterval(countdownInterval);
      freshTimerContainer.style.display = "none";
      freshTimerBar.style.width = "100%";
      showScene(choice.next);
    });
    currentChoicesDiv.appendChild(btn);
  });
}

// --- SCREEN TRANSITIONS ---
function switchScreen(hideId, showId) {
  document.getElementById(hideId).style.display = "none";
  document.getElementById(showId).style.display = "flex";
}

// --- CREDITS ---
function showCredits() {
  switchScreen("game-screen", "credits-screen");
  sprite.style.display = "block"; // reset sprite visibility for next playthrough
}

// --- START BUTTON ---
document.getElementById("start-button").addEventListener("click", function () {
  switchScreen("start-screen", "game-screen");
  showScene("start");
});

// --- MAIN MENU BUTTON ---
document.getElementById("menu-button").addEventListener("click", function () {
  switchScreen("credits-screen", "restart-screen");
});

// --- RESTART BUTTON ---
document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    switchScreen("restart-screen", "game-screen");
    showScene("start");
  });

// --- EXTRA BUTTON ---
// on restart screen, clicking extra opens the unlocked art popup
document.getElementById("extra-button").addEventListener("click", function () {
  document.getElementById("extras-popup").style.display = "flex";
});

document.getElementById("close-extras").addEventListener("click", function () {
  document.getElementById("extras-popup").style.display = "none";
});

// --- CREDITS BUTTON ---
// on restart screen, clicking credits goes to credits screen
document
  .getElementById("credits-button")
  .addEventListener("click", function () {
    switchScreen("restart-screen", "credits-screen");
  });
