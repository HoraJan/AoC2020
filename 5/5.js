function getSortedSeatsNumber(arr) {
  return arr
    .split("\n")
    .map((str) => {
      const binary = str.replace(/f|l/gi, "0").replace(/b|r/gi, "1");
      return parseInt(binary, 2);
    })
    .sort((a, b) => a - b);
}

function solution5first(arr) {
  const seats = getSortedSeatsNumber(arr);
  return seats.reverse()[0];
}
function solution5second(arr) {
  const seats = getSortedSeatsNumber(arr);
  const missing = seats.find((seat, index) => seat === seats[index - 1] + 2);
  return missing - 1;
}

module.exports = {
  solution5first: solution5first,
  solution5second: solution5second,
};
