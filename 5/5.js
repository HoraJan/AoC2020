function getSeatNumber(str) {
  const binary = str.replace(/f|l/gi, "0").replace(/b|r/gi, "1");
  return (decimal = binary
    .split("")
    .reverse()
    .reduce((acc, curr, index) => {
      return acc + curr * Math.pow(2, index);
    }, 0));
}

function solution5first(arr) {
  const lines = arr.split("\n");
  return lines.reduce((max, line) => {
    return Math.max(max, getSeatNumber(line));
  }, 0);
}
function solution5second(arr) {
  const seats = arr.split("\n").map(getSeatNumber);
  seats.sort();
  const missing = seats.filter((seat, index) => seat === seats[index - 1] + 2);
  return missing - 1;
}

module.exports = {
  solution5first: solution5first,
  solution5second: solution5second,
};
