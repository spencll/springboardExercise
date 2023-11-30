function findRotatedIndex(arr, num) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    //win conditions
    if (arr[mid] === num) {
      return mid;
    }
    else if (arr[right]===num) {
        return right
    }
    else if (arr[left]===num) {
        return left
    }
    //checks right side
    if (arr.slice(mid, right).includes(num)) {
      left = mid + 1;
    }
    //checks left side
    else if (arr.slice(0, mid).includes(num)) {
      right = mid - 1;
    }
    //num doesn't exist in array
    else {
        return -1
    }
  }
  //lose
  return -1;
}

module.exports = findRotatedIndex;
