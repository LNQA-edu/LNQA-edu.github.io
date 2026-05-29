const card = document.querySelector(".card");
console.log(card);

// card flip on hover
/*card.addEventListener("mouseenter", function () {
  card.classList.add("flip");
});

card.addEventListener("mouseleave", function () {
  card.classList.remove("flip");
}); */

/* theres many way to do flip, classList is one of them, 
you can also use style.transform = "rotateY(180deg)"; 
and style.transform = "rotateY(0deg)"; to flip the card, 
but using classList is more efficient and cleaner. */

// card flip on click
card.addEventListener("click", function () {
  card.classList.toggle("yflip");
});
