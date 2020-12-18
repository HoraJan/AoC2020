const FINAL_SUM = 2020;

function solution1first(arr) {
  const len = arr.length;
  for (let i0 = 0; i0 < len; i0++) {
    for (let i1 = i0 + 1; i1 < len; i1++) {
      if (arr[i0] + arr[i1] === FINAL_SUM) {
        return arr[i0] * arr[i1];
      }
    }
  }
}
function solution1second(arr) {
  const len = arr.length;
  for (let i0 = 0; i0 < len; i0++) {
    for (let i1 = i0 + 1; i1 < len; i1++) {
      for (let i2 = i1 + 1; i2 < len; i2++) {
        if (arr[i0] + arr[i1] + arr[i2] === FINAL_SUM) {
          return arr[i0] * arr[i1] * arr[i2];
        }
      }
    }
  }
}

module.exports = {
  solution1first: solution1first,
  solution1second: solution1second,
};
