console.log("Im trapped. Send help. I am a prisoner of the console.");

// this is a comment
/* this is a multi line comment
it can be used to write more than one line of comments
like this */

// Data types within JS
// let: defining variables or creating boxes whose value change
// const: defining boxes for variables whose value is constant (cannot be changed)
// numbers: can be both positive and negative, can be decimals (fractions)

let myStudentId = 666;
console.log(myStudentId);
myStudentId = 999;
console.log(myStudentId);
// so the value of myStudentId can be changed because it is defined using let

let myBudget = 30.57;
console.log(myBudget);
console.log("I can spend today: $", myBudget);
// + addition - subtraction * multiplication / division % modulus (remainder)
{
  let a = 20;
  let b = 40;
  let c = a + b;
  console.log("total value", c);
}
// scope: curly braces for closing/shutting things inside

let x = 40;
if (x === 40) {
  console.log(true);
}

// boolean: mainly used for condition check (true or false)
let isItFriday = true;
let isItPublicHoliday = false;
// conditional statement: used for conditionally running something
if (isItPublicHoliday) {
  console.log("yayyy no class todaiii");
} else {
  console.log("soariii no class todaiii");
}

/* null: empty box
undefined: blind unknown box */
let iAmUnknown;
let emptyBox = null;
console.log(emptyBox);

// strings: store alphanumeric value including html
const myName = "Ly Ngoc Quynh An";
console.log("Hello", myName);
const myName2 = "An";
console.log("Hello", myName2);

let myCity = "Melbourne";
console.log("Hello", myCity);

/* objects: group things belong to the same entity
here you can have multiple datatypes */
const myRecord = { myName: "An", id: 666, city: "Saigon" };
console.log(myRecord);
console.log(myRecord.city);

const grade1 = 67;
const grade2 = 84;

if (grade1 > 60 && grade1 < 70) {
  console.log("you got C");
} else if (grade1 > 70 && grade1 < 80) {
  console.log("you got D");
}
if (grade1 >= 80 && grade1 < 100) {
  console.log("you got HD");
}

// arrays: collection of elements if same kind
const grades = [67, 84, 76, 90, 45];
const cities = ["mel", "syd", "ade"];
// arrays starts at 0, not 1
console.log("grade of student 1", grades[0]);
console.log("second city i visited", cities[2]);

const students = ["alice", "bob", "carol", "deb", "elisa", "frank"];
// console.log ("hello", students[0]);
// console.log ("hello", students[1]);
// console.log ("hello", students[2]);
// console.log ("hello", students[3]);
// doing like above and ur a stupid ahh
console.log(students.length);
for (let i = 0; i < students, length; i++) {
  // creating a loop
  console.log("hello", students[i]);
}

const expenditures = [34, 4, 78, 5, 10];
let totalSpend = 0;
console.log(expenditures.length);
for (let i = 0; i < expenditures, length; i++) {
  totalSpend = totalSpend + expenditures[i];
  console.log("expenditure so far:", totalSpend);
}
console.log("total expenditures is:", totalSpend);

let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
];
console.log(shoppingCart[0].price);
let purchases = 0;
console.log(shoppingCart.length);
for (let i = 0; i < shoppingCart.length; i++) {
  purchases = purchases + shoppingCart[i].price;
  console.log("purchased:", shoppingCart[i].price);
}
console.log("total purchase is:", purchases);
let discount = 0;
if (purchases > 100) {
  discount = purchases - 10 * (purchases / 100);
  console.log("your discounted price is:", discount);
}
