function getSeatNumber(str) {
  const binary = str.replace(/f|l/gi, "0").replace(/b|r/gi, "1");
  return parseInt(binary, 2);
}

function solution5first(arr) {
  const seats = arr.split("\n").map(getSeatNumber);
  return seats.sort((a, b) => b - a)[0];
}
function solution5second(arr) {
  const seats = arr.split("\n").map(getSeatNumber);
  seats.sort();
  const missing = seats.find((seat, index) => seat === seats[index - 1] + 2);
  return missing - 1;
}

module.exports = {
  solution5first: solution5first,
  solution5second: solution5second,
};
