const myCards = [
  { id: 1, name: "Queen", src: "queen.png" },
  { id: 2, name: "King", src: "king.png" },
  { id: 3, name: "Jack", src: "jack.png" },
];

let cardComposition = "";

// shuffle cards using fisher-yates shuffle algorithm
function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleCards(myCards);

const deck = document.querySelector(".deck");

for (let i = 0; i < myCards.length; i++) {
  cardComposition += `
<div class="card-container">
        <div class="card" draggable="true">
          <div class="card-face"><img src="cloud.png" alt="Back" /></div>
          <div class="card-face flip">
            <img src="${myCards[i].src}" alt="${myCards[i].name}" class="card-front" />
          </div>
        </div>
      </div>
`;
  console.log(cardComposition);
}

console.log(cardComposition);
deck.innerHTML = cardComposition;

const cards = document.querySelectorAll(".card");
console.log(cards);

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("dragstart", function () {
    draggedCard = cards[i];
    console.log(draggedCard);
  });
}

const dropbox = document.querySelector(".dropbox");
console.log(dropbox);

dropbox.addEventListener("drop", function () {
  // let clone = draggedCard.cloneNode(true);
  letclone = draggedCard;
  dropbox.appendChild(clone);
  clone.addEventListener("click", function () {
    clone.classList.toggle("yflip");
  });
  draggedCard = null;
});
