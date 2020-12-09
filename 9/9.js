function findSum(length, arr, sum) {
  const oposities = new Set();
  for (let i = 0; i < length; i++) {
    if (oposities.has(arr[i]) && arr[i] * 2 !== sum) {
      return true;
    }
    oposities.add(sum - arr[i]);
  }
  return false;
}

function getContiguousSum(arr, sum) {
  let currSum = 0;
  for (let i = 0; i < arr.length; i++) {
    currSum += arr[i];
    if (currSum === sum) {
      return { found: true, arr: arr.slice(0, i + 1).sort((a, b) => a - b) };
    }
  }
  return { found: false };
}

function solution9first(string, preambuleLength) {
  const arr = string.split("\n").map((s) => parseInt(s));
  const testLength = arr.length;
  let currentIndex = preambuleLength;
  while (currentIndex <= testLength) {
    const currArray = arr.slice(currentIndex - preambuleLength, currentIndex);
    const searchedSum = arr[currentIndex];
    currArray.sort((a, b) => a - b);
    const found = findSum(preambuleLength, currArray, searchedSum);
    if (!found) {
      return searchedSum;
    }
    currentIndex++;
  }
}

function solution9second(string, falseSum) {
  const arr = string.split("\n").map((s) => parseInt(s));
  const testLength = arr.length;
  let currentIndex = 0;
  while (currentIndex <= testLength) {
    const test = getContiguousSum(arr.slice(currentIndex), falseSum);
    if (test.found) {
      return test.arr[0] + test.arr.pop();
    }
    currentIndex++;
  }
}

module.exports = {
  solution9first: solution9first,
  solution9second: solution9second,
};
