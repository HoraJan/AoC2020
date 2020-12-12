function getJoils(string) {
  const joils = ("0\n" + string)
    .split("\n")
    .map((str) => parseInt(str))
    .sort((a, b) => a - b);
  joils.push(joils[joils.length - 1] + 3);

  return joils;
}

function solution10first(string) {
  const joils = getJoils(string);
  let previous = 0;
  const diffs = [0, 0, 0, 0];
  joils.forEach((joil) => {
    const diff = joil - previous;
    previous = joil;
    diffs[diff]++;
  });
  return diffs[1] * diffs[3];
}

function solution10second(string) {
  const joils = getJoils(string);

  let previous = 0;
  let currLength = 0;
  const sumLength = [];
  joils.forEach((joil, index) => {
    if (index === joils.length - 1) {
      sumLength.push(currLength);
      return;
    }

    const diff = joil - previous;
    previous = joil;
    if (diff === 3) {
      sumLength.push(currLength);
      currLength = 1;
      return;
    }

    currLength++;
  });
  const nums = [1, 1, 1, 2, 4, 7];
  return sumLength.reduce((acc, curr) => {
    return acc * nums[curr];
  }, 1);
}

module.exports = {
  solution10first: solution10first,
  solution10second: solution10second,
};
