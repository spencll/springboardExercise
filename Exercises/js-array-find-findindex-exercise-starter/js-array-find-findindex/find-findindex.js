/* 
Write a function called `findUserByUsername` which accepts an array of objects, each with a key of username, and a string. The function should return the first object with the key of username that matches the string passed to the function. If the object is not found, return undefined. 

const users = [
  {username: 'mlewis'},
  {username: 'akagen'},
  {username: 'msmith'}
];

findUserByUsername(users, 'mlewis') // {username: 'mlewis'}
findUserByUsername(users, 'taco') // undefined
*/

//array of objects -> first obj with username
function findUserByUsername(usersArray, username) {
   const user = usersArray.find(function(obj){
      return obj[`username`] === username
   })
return user
}

/*
Write a function called `removeUser` which accepts an array of objects, each with a key of username, and a string. The function should remove the object from the array. If the object is not found, return undefined. 

const users = [
  {username: 'mlewis'},
  {username: 'akagen'},
  {username: 'msmith'}
];

removeUser(users, 'akagen') // {username: 'akagen'}
removeUser(users, 'akagen') // undefined
*/
//array of objects, remove obj with certain user name
function removeUser(usersArray, username) {
const removed = usersArray.findIndex(function(obj){
  return obj[`username`] === username
})
if (removed === -1){return}
//takes out user, then returns first element in new array which is just the user
return usersArray.splice(removed,1)[0]
}