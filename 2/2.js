function solution2first(arr) {
  const lines = arr.split("\n");
  const filteredLines = lines.filter((line) => {
    const [times, letter, haystick] = line.replace(":", "").trim().split(" ");
    const [low, high] = times.split("-");
    const re = new RegExp(letter, "g");
    if (!haystick.match(re)) return false;

    return (
      low <= haystick.match(re).length && haystick.match(re).length <= high
    );
  });
  return filteredLines.length;
}
function solution2second(arr) {
  const lines = arr.split("\n");
  const filteredLines = lines.filter((line) => {
    const [times, letter, haystick] = line.replace(":", "").trim().split(" ");
    const [first, second] = times.split("-");
    const splitted = haystick.split("");
    const firstCheck = splitted[parseInt(first) - 1] === letter;
    const secondCheck = splitted[parseInt(second) - 1] === letter;

    return firstCheck != secondCheck;
  });
  return filteredLines.length;
}

module.exports = {
  solution2first: solution2first,
  solution2second: solution2second,
};
