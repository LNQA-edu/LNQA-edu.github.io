/* Variables: boxes to store values
 let: changeable value
 const: unchangeable value
 numeric: 1, 2, 3, 4, 5; 
 boolean: true, false; 
 null/undefined: no value; 
 object: {name: "John", age: 30}; 
 array: [1, 2, 3, 4, 5]*/

//  numeric: use for mathematical operations
let a = 10;

//  string: text containing alphanumeric characters, enclosed in single or double quotes
const name = "An";

// boolean: true or false
let itIsRaining = false;

/* object: group of properties of the same entity (student)
properties: age, name, id*/
let student = {
  name: "An",
  id: 666,
};
// now the properties of the student object can be accessed using dot notation: student.name, student.id

// arrays: collection but they are all of the same type
let grades = [34, 45, 68, 78];
let names = ["An", "John", "Jane"];
// grades[2] = 68; IMP: arrays start at 0
// grades.length: gives the number of elements in the array

/* conditional statements
if: (condition) {true -> execute this code}
else: {false -> execute this code}
else if: (condition) {true -> execute this code}
*/
if (itIsRaining) {
  console.log("yes, it is.");
} else {
  console.log("no it isn't.");
}

/* loops: iterate through a function or a set of instructions until a specified condition is met
 for: loop
 while
 do-while
 */
for (let i = 0; i < grades.length; i++) {
  console.log("Hello", names[i]);
}
// function: block of code that performs a specific task.
let b = 20;
function add(a, b) {
  let c = a + b;
  console.log("value of c", c);
  return c;
}
// this is called defining a function

add(a, b);
// this is called calling a function: function executes when it is called.
add(4, 5);
let c = add(a, 50);
console.log("value of c", c);

// another example of function
function greet(name) {
  let greetings = "Hello, " + name;
  return greetings;
}

let welcome = greet("An");
console.log(welcome);
console.log(greet("John"));
