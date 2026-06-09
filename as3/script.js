// --- SCENE DATA ---
// each scene holds its background, sprite, dialogue, and choices
// choices use "next" to point to the next scene by name
const scenes = {
  start: {
    background: "test-bg.png",
    sprite: "test-sprite.png",
    text: "Hello, it's good to finally meet you.",
    choices: [
      { text: "Yes", next: "end" },
      { text: "Who are you?", next: "scene2" },
    ],
  },
  scene2: {
    background: "test-bg.png",
    sprite: "test-sprite.png",
    text: "I am your best Magical Girl, beacon of Justice, always ready to save the day!",
    choices: [
      { text: "Yes", next: "end" },
      { text: "What do you mean by 'evil'?", next: "scene3" },
    ],
  },
  scene3: {
    background: "assets/bg1.png",
    sprite: "assets/sprites/neutral.png",
    text: "Not what - it's who, silly!",
    choices: [
      { text: "Yes", next: "end" },
      { text: "What have they done that was so evil?", next: "scene4" },
    ],
  },
  scene4: {
    background: "assets/bg1.png",
    sprite: "assets/sprites/angry.png",
    text: "I'm afraid we do not have time for this, but if you must know…",
    choices: [
      { text: "Yes", next: "end" },
      { text: "That's not enough to end people.", next: "scene5" },
    ],
  },
  scene5: {
    background: "assets/bg1.png",
    sprite: "assets/sprites/angry.png",
    text: "When will it be enough then? When they finally have the slightest ounce of mercy to just shut up?",
    choices: [
      { text: "Yes", next: "end" },
      { text: "No", next: "scene6" },
    ],
  },
  scene6: {
    background: "assets/bg1.png",
    sprite: "assets/sprites/angry.png",
    text: "Actually, you don't have a say in this.",
    choices: [
      { text: "Yes", next: "end_forced" }, // both choices lead to same place
      { text: "Yes", next: "end_forced" }, // agency is removed intentionally
    ],
  },
  end_forced: {
    background: "assets/bg2.png",
    sprite: "assets/sprites/happy.png",
    text: "I know you would choose right.",
    choices: [], // no choices, click to advance
  },
  end: {
    background: "assets/bg2.png",
    sprite: "assets/sprites/happy.png",
    text: "I knew you would understand.",
    choices: [], // no choices, click to advance
  },
};

// --- GRAB ELEMENTS ---
// stored as variables so we don't query the DOM repeatedly
const background = document.getElementById("background");
const sprite = document.getElementById("sprite");
const dialogue = document.getElementById("dialogue");
const choicesDiv = document.getElementById("choices");

// --- SHOW SCENE ---
// updates all visual elements and generates choice buttons for the current scene
function showScene(sceneId) {
  const scene = scenes[sceneId];
  background.src = scene.background; // swap background image
  sprite.src = scene.sprite; // swap character sprite
  dialogue.textContent = scene.text; // update dialogue text
  choicesDiv.innerHTML = ""; // clear previous choice buttons

  if (scene.choices.length === 0) {
    // no choices means end of a story branch, click dialogue to continue
    dialogue.addEventListener("click", function handler() {
      dialogue.removeEventListener("click", handler); // remove after one use
      showCredits();
    });
    return;
  }

  // generate a button for each choice in the scene
  scene.choices.forEach(function (choice) {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.className = "choice-btn"; // shared class for consistent styling
    btn.addEventListener("click", function () {
      showScene(choice.next); // clicking loads the next scene
    });
    choicesDiv.appendChild(btn);
  });
}

// --- SCREEN TRANSITIONS ---
// hides one screen and shows another to simulate page changes
function switchScreen(hideId, showId) {
  document.getElementById(hideId).style.display = "none";
  document.getElementById(showId).style.display = "block";
}

// --- CREDITS ---
// shows black credits screen briefly before revealing end screen
function showCredits() {
  switchScreen("game-screen", "credits-screen");
  document.getElementById("credits-text").textContent = "your credits here";
  setTimeout(function () {
    switchScreen("credits-screen", "end-screen"); // auto advance after 4 seconds
  }, 4000);
}

// --- START BUTTON ---
// hides start screen and loads first scene when player clicks start
document.getElementById("start-btn").addEventListener("click", function () {
  switchScreen("start-screen", "game-screen");
  showScene("start");
});

// --- RESTART BUTTON ---
// returns player to beginning from end screen
document.getElementById("restart-btn").addEventListener("click", function () {
  switchScreen("end-screen", "game-screen");
  showScene("start");
});

// --- UNLOCKED ART POPUP ---
// clicking the unlocked art on end screen opens a popup with extra writing
document.getElementById("unlocked-art").addEventListener("click", function () {
  document.getElementById("art-popup").style.display = "block";
});

// closes the popup when X is clicked
document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("art-popup").style.display = "none";
});
