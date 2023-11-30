function findFloor(arr, num) {
  //closest number to num that's less
  let left = 0;
  let right = arr.length - 1;
  //auto win
  if (arr[arr.length-1]<num){
    return arr[arr.length-1]
  }
  //auto lose
  if (arr[0]>num){
    return -1
  }

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    //sees if mid < num and mid+1 >num, STOP
    if (arr[mid]<num && arr[mid+1]>num){
        return arr[mid]
    }
    //checks right side
    else if (arr[mid]<num){
        console.log('check right')
        left = mid + 1
    }
    //checks left side
    else if (arr[mid]>num){
        console.log('check left')
        right = mid -1
    }

  }

}

module.exports = findFloor