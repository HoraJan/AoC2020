function solution3first(arr, left, down) {
  const lines = arr.split("\n");
  const linesPieces = lines.map((line) => line.split(""));
  const lineLength = lines[0].length;
  const linesCount = lines.length;
  let trees = 0;
  for (let row = 0; row < linesCount; row = row + down) {
    const column = ((row / down) * left) % lineLength;
    if (linesPieces[row][column] === "#") {
      trees++;
    }
  }
  return trees;
}
function solution3second(arr) {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const trees = slopes.map((slope) => solution3first(arr, slope[0], slope[1]));

  return trees.reduce((acc, el) => acc * el, 1);
}

module.exports = {
  solution3first: solution3first,
  solution3second: solution3second,
};
