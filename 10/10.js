function solution10first(string) {
  const joils = string
    .split("\n")
    .map((str) => parseInt(str))
    .sort((a, b) => a - b);
  let ones = 0;
  let threes = 1;
  let previous = 0;
  joils.forEach((joil) => {
    const diff = joil - previous;
    previous = joil;
    if (diff === 1) {
      ones++;
    }
    if (diff === 3) {
      threes++;
    }
  });
  return ones * threes;
}

function solution10second(string) {
  const joils = ("0\n" + string)
    .split("\n")
    .map((str) => parseInt(str))
    .sort((a, b) => a - b);

  let previous = 0;
  let currLength = 0;
  const sumLength = [];
  const objs = joils.forEach((joil, index) => {
    const diff = joil - previous;
    previous = joil;
    if (diff === 3) {
      sumLength.push(currLength);
      currLength = 0;
    }
    currLength++;
    if (index === joils.length - 1) {
      sumLength.push(currLength);
    }
  });
  const nums = {
    3: 2,
    4: 4,
    5: 7,
  };
  const filteredLengths = sumLength.filter((i) => i > 2);
  return filteredLengths.reduce((acc, curr) => {
    return acc * nums[curr];
  }, 1);
}

module.exports = {
  solution10first: solution10first,
  solution10second: solution10second,
};
