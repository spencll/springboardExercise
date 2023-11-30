function countZeroes(arr) {
  let left = 0;
  let right = arr.length - 1;

  //begins with 0 or ends with 1, easy
  if (arr[left] === 0) {
    return arr.length;
  } else if (arr[right] === 1) {
    return 0;
  }

  //keeps running if no 1->0 crossover
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    //if crossover
    if (arr[mid] === 0 && arr[mid - 1] === 1) {
      return arr.length-mid
    }

    //need to explore more right
    else if (arr[mid] === 1) {
      left = mid + 1;
    }

    //need to explore more left
    else if (arr[mid] === 0) {
      right = mid-1;
    }
  }
}

 module.exports = countZeroes;
