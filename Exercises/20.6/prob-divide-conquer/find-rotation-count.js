function findRotationCount(arr,num) {
  let left = 0;
  let right = arr.length - 1;
//looking for how far smallest number from first index
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    //check right for irregularity 
     if (arr[mid]>arr[right]){
        left = mid + 1
    }
    //check left 
    else if (arr[mid]>arr[left]){
        right = mid -1
    }
    else {
        return mid
    }

}
}

module.exports = findRotationCount