// DOM: DOCUMENT OBJECT MODEL
const heading = document.querySelector("h1");
console.log(heading);
console.log(heading.textContent);
// reading DOM
heading.textContent = "I already know DOM!";
// modifying or updating DOM

const subheading = document.querySelectorAll("p");
console.log(subheading);
for (let i = 0; i < subheading.length; i++) {
  console.log(subheading[i].textContent);
}
// console.log(subheading.textContent);

const subsubheading = document.querySelector("h3");
console.log(subsubheading);

const blueItems = document.querySelector(".bluecolor");
console.log(blueItems);

const subHead = document.querySelector("#subhead-1");
console.log(subHead);
// just copy id, class, blah blah to avoid typos.
/* can use either querySelector or getElementById, 
but querySelector is more versatile.
getElementById is faster but not a big deal for small projects.*/

const courseName="Interactive Media";
const courseId="OART1013";
const header= document.querySelector("header");
console.log(header);
console.log(header.innerHTML);
header.innerHTML += ' 
// use backticks to write multi-line string and embed variables using ${variableName}
<h3class="blue-color"> ${courseName} </h3>
<p> ${courseId} </P> ';

const myCat = document.querySelector("#meow");
console.log(myCat);  

myButton =document.querySelector("#my-button");
console.log(myButton);
myButton.addEventListener("click", toggleMe);
myButton.addEventListener("mouseover", addMe);
myButton.addEventListener("mouseout", removeMe);

function addMe() {
  myCat.classList.add("round");
  myButton.textContent = "click meow!";
  body.style.backgroundColor = "pink";
}

function removeMe() {
  myCat.classList.remove("round");
  myButton.textContent = "dont click meow!";
  body.style.backgroundColor = "lime";
}
// suggestions: for using to play audios?

function toggleMe() {
  myCat.classList.remove("round");
  myButton.textContent = "dont click meow!";
}

/* rock paper scissors game example: randomise toggles
read the code line comments in canvas for more details. */