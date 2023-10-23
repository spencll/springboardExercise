let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

console.log(numPlanets); // ?
//setting numPlanets variable to key value of facts so 8
console.log(yearNeptuneDiscovered); // ?
//setting yearNeptuneDiscovered to key value of facts so 1846

let planetFacts = {
  numPlanets: 8,
  yearNeptuneDiscovered: 1846,
  yearMarsDiscovered: 1659
};

let {numPlanets, ...discoveryYears} = planetFacts;

console.log(discoveryYears); 
//setting discoveryYears equal to obj past numPlanets

function getUserData({firstName, favoriteColor="green"}){
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}

getUserData({firstName: "Alejandro", favoriteColor: "purple"})
// `Your name is Alejandro and you like purple
getUserData({firstName: "Melissa"}) 
// `Your name is Melissa and you like green
getUserData({}) 
//`Your name is undefined and you like green

let [first, second, third] = ["Maya", "Marisa", "Chi"];
console.log(first); 
//Array is by order so first is Maya
console.log(second);
//Marisa
console.log(third); 
//Chi

let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings"
]

console.log(raindrops); 
//Raindrops on roses
console.log(whiskers);
//Whiskers on kittens
console.log(aFewOfMyFavoriteThings); 
//Everything past whiskers on kittens in an array

let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers) // [10, 30, 20]

var obj = {
  numbers: {
    a: 1,
    b: 2
  }
};
var a = obj.numbers.a;
var b = obj.numbers.b;

const {numbers: {a,b}} = obj 

var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;

var arr = [1, 2];
[arr[0],arr[1]] = [arr[1], arr[0]]

//destructured parameters for variable assignment by position into object with key as position
const raceResults = ([first, second, third, ...rest]) => ({first, second, third, rest})
