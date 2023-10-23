//function createInstructor(firstName, lastName){
   // return {
  //    firstName: firstName,
  //    lastName: lastName
  //  }
 // }

 const createInstructor = (firstName, lastName) => 
 ({
    firstName,
    lastName

 })

//var favoriteNumber = 42;

//var instructor = {
 // firstName: "Colt"
//}

//i//nstructor[favoriteNumber] = "That is my favorite!"

const instructor = (favoriteNumber) => ({
    firstName: "Colt",
    [favoriteNumber]: `That is my favorite!`
})

//var instructor = {
   // firstName: "Colt",
    //sayHi: function(){
   //   return "Hi!";
   // },
   // sayBye: function(){
   //   return this.firstName + " says bye!";
  //  }
  //}

  const instructor = 
  {
    firstName: "Colt",
    sayHi(){
           return "Hi!";
         },
         sayBye(){
         return this.firstName + " says bye!";
         }
  }

  const createAnimal = (species,verb,noise) => ({
        species,
        [verb](){
            return noise;
        },
  })