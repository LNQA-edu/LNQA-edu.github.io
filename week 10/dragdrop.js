const cards = document.querySelector(".card");
console.log(card);

cards.addEventListener("click", function () {
  cards.classList.toggle("yflip");
});

let draggedCard = null;

cards.addEventListener("dragstart", function () {
  draggedCard = card;
  console.log(draggedCard);
});

const dropbox = document.querySelector(".dropbox");
console.log(dropbox);

dropbox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

card.addEventListener("drop", function () {
  //   let clone = draggedCard.cloneNode(null);
  let clone = draggedCard;
  dropbox.appendChild(clone);
  draggedCard = null;
});
