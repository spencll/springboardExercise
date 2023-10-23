//function filterOutOdds() {
//    var nums = Array.prototype.slice.call(arguments);
//    return nums.filter(function(num) {
//      return num % 2 === 0
//    });
//  }

const filterOutOdds = (...nums) => nums.filter((num) =>num % 2 === 0 )
//any number of arguements using rest
//spreading arguements to individual numbers and eval min using spread
const findMin = (...arg) => Math.min(...arg)
//putting objects together into new object 
const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2})
//new array starting with arr with rest of parameters doubled via map
const doubleAndReturnArgs = (arr, ...more) => [arr, ...more.map((num)=> num*2)]

/** remove a random element in the items array
and return a new array without that item. */
//combining two rests, one before random index, one after random index
function removeRandom(items) {
    //random number between 0 and length of array
    let rand = (Math.floor(Math.random() * items.length))
return [...items.slice(0, rand),...items.slice(rand +1)]
}

/** Return a new array with every item in array1 and array2. */
//combining arrays
function extend(array1, array2) {
    return [...array1, ...array2]
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */
//takes obj and adds key/val
function addKeyVal(obj, key, val) {
    let newobj = {...obj}
    newobj[key]=val;
    return newobj;
}


/** Return a new object with a key removed. */

function removeKey(obj, key) {
    let newobj = {...obj}
    delete newobj.key;
    return newobj
}


/** Combine two objects and return a new object. */

function combine(obj1, obj2) {
    return {...obj1, ...obj2}
}


/** Return a new object with a modified key and value. */

function update(obj, key, val) {
   let newobj = {...obj}
   newobj[key] = val;
   return newobj
}