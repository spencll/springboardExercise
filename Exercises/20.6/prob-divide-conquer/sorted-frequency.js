function sortedFrequency(arr, num) {
    
  
    function findFirst(arr, num, left = 0, right =arr.length - 1) {
      

        if (left <= right) {
          let mid = Math.floor((left + right) / 2)
          //mid is our number and is at the beginning or the previous number is not our number 
          if ((mid === 0 || num > arr[mid - 1]) && arr[mid] === num) {
            return mid;
            //num greater than mid, check right
          } else if (num > arr[mid]) {
            left = mid +1
            return findFirst(arr, num,mid +1,right)

            //num less than mid, check left
          } else {
            return findFirst(arr, num, left, mid-1)
          }
        }
        return -1
      }

      function findLast(arr, num, left = 0, right =arr.length - 1) {
        if (left <= right) {
          let mid = Math.floor((left + right) / 2)

          //mid is our number and is at the end or the next number is not our number 
          if ((mid === arr.length - 1 || num < arr[mid + 1]) && arr[mid] === num) {
            return mid;
            //num less than mid, check left
          } else if (num < arr[mid]) {
            return findLast(arr, num, left, mid-1)

            //num greater than mid, check right 
          } else {
            return findLast(arr, num, mid+1, right)
          }
        }
        return -1
      }
      if (findFirst(arr, num)===-1){
        return -1
      }
      return findLast(arr, num)+1 - (findFirst(arr, num))

}
module.exports = sortedFrequency