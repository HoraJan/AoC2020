const maskRegexp = /mask = (?<mask>[X01]*)/;
const memRegexp = /mem\[(?<index>\d+)\] = (?<value>\d+)/;

function replaceOnPosition(indexArray, i, value) {
  return indexArray.map((innerIndex) => {
    const splitted = innerIndex.split("");
    splitted[i] = value;
    return splitted.join("");
  });
}

function sumValues(object) {
  return Object.values(object).reduce((acc, curr) => acc + curr, 0);
}

function create36bitString(string) {
  return parseInt(string).toString(2).padStart(36, "0");
}

function solution14first(string) {
  const lines = string.split("\n");
  const memObject = {};
  let curMask = "";

  lines.forEach((line) => {
    const mask = line.match(maskRegexp);
    if (mask) {
      curMask = mask.groups.mask;
      return;
    }

    let { index, value } = line.match(memRegexp).groups;
    value = create36bitString(value);

    for (let i = 0; i < 36; i++) {
      if (curMask[i] === "X") {
        continue;
      }
      [value] = replaceOnPosition([value], i, curMask[i]);
    }

    memObject[index] = parseInt(value, 2);
  });

  return sumValues(memObject);
}

function solution14second(string) {
  const lines = string.split("\n");
  const memObject = {};
  let curMask = "";

  lines.forEach((line) => {
    const mask = line.match(maskRegexp);
    if (mask) {
      curMask = mask.groups.mask;
      return;
    }

    let { index, value } = line.match(memRegexp).groups;
    index = create36bitString(index);
    let indexArray = [index];

    for (let i = 0; i < 36; i++) {
      if (curMask[i] === "0") {
        continue;
      }
      if (curMask[i] === "1") {
        indexArray = replaceOnPosition(indexArray, i, 1);
        continue;
      }
      const x0arr = replaceOnPosition(indexArray, i, 0);
      const x1arr = replaceOnPosition(indexArray, i, 1);
      indexArray = [...x0arr, ...x1arr];
    }

    indexArray.forEach((index) => {
      const decIndex = parseInt(index, 2);
      memObject[decIndex] = parseInt(value);
    });
  });

  return sumValues(memObject);
}

module.exports = {
  solution14first: solution14first,
  solution14second: solution14second,
};
