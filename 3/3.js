const TREE_CHAR = "#";

function countTrees(arr, left, down) {
  const lines = arr.split("\n");
  const lineLength = lines[0].length;
  const linesCount = lines.length;
  let trees = 0;
  for (let row = 0; row < linesCount; row = row + down) {
    const column = ((row / down) * left) % lineLength;
    if (lines[row][column] === TREE_CHAR) {
      trees++;
    }
  }
  return trees;
}

function solution3first(arr) {
  return countTrees(arr, 3, 1);
}
function solution3second(arr) {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  const trees = slopes.map((slope) => countTrees(arr, slope[0], slope[1]));

  return trees.reduce((acc, el) => acc * el, 1);
}

module.exports = {
  solution3first: solution3first,
  solution3second: solution3second,
};
