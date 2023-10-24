new Set([1,1,2,2,3,4])

//{1,2,3,4}

[...new Set("referee")].join("")

//spreads unique letters of referee and joins into "ref"

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

//array is reference so it's two different keys
0: {Array(3) => true}
1: {Array(3) => false}


const hasDuplicate = (arr) => [...new Set(arr)].length !==arr.length
//takes unique values of arr into set, then spread into array, and compare arr length to original

hasDuplicate([1,3,2,1]) // true
hasDuplicate([1,5,-1,4]) // false

const vowelCount = function (str){
  const vowels = `aeiou`;
  let m = new Map()
  const letters = str.toLowerCase().split(``)
  for (let letter of letters){
  if (vowels.includes(letter)){
    if (m.has(letter)){
      //counter after key made
      m.set(letter, m.get(letter)+1)
  }
  //creating key in first place
    else {m.set(letter, 1)}
    }
  }
    return m
  }