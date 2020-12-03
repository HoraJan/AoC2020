// 2-9 c: ccccccccc
function regexpMatch(str) {
  return str.match(
    /\s*(?<first>\d+)-(?<second>\d+)\s(?<letter>\w):\s(?<haystick>\w+)/
  );
}

function solution2first(arr) {
  const lines = arr.split("\n");
  const filteredLines = lines.filter((line) => {
    const { first, second, letter, haystick } = regexpMatch(line).groups;
    const letters = haystick.match(new RegExp(letter, "g"));
    const numberOfLetters = letters ? letters.length : 0;

    return first <= numberOfLetters && numberOfLetters <= second;
  });
  return filteredLines.length;
}
function solution2second(arr) {
  const lines = arr.split("\n");
  const filteredLines = lines.filter((line) => {
    const { first, second, letter, haystick } = regexpMatch(line).groups;
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
