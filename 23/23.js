function play(string, length, turns) {
  let labels = new Array(length).fill(" ");
  labels = labels.map((_el, ind) => ind + 1);
  string.split("").forEach((el, ind) => (labels[ind] = parseInt(el)));

  const currentCupIndex = 0;
  for (let i = 0; i < turns; i++) {
    const currentCup = labels[currentCupIndex];
    let destinationLabel = currentCup - 1;
    let destinationIndex = -1;
    const pickUp = labels.splice(currentCupIndex + 1, 3);
    while (destinationLabel !== 0 && destinationIndex === -1) {
      if (pickUp.includes(destinationLabel)) {
        destinationLabel--;
        continue;
      }
      destinationIndex = labels.findIndex((el) => el === destinationLabel);
      if (destinationIndex === -1) {
        destinationLabel--;
      }
    }
    if (destinationLabel === 0) {
      let max = 0;
      const currentMax = pickUp.includes(length)
        ? pickUp.includes(length - 1)
          ? pickUp.includes(length - 2)
            ? length - 3
            : length - 2
          : length - 1
        : length;
      for (let a = 0; a < labels.length; a++) {
        if (labels[a] > max) {
          max = labels[a];
          destinationIndex = a;
        }
        if (max === currentMax) {
          break;
        }
      }
    }
    labels.splice(destinationIndex + 1, 0, ...pickUp);
    const first = labels.shift();
    labels.push(first);
  }

  let result = [...labels, ...labels];
  const firstOne = result.findIndex((el) => el === 1);
  result = result.slice(firstOne + 1).slice(0, 8);

  return result;
}

function solution23first(string) {
  return play(string, 9, 100).join("");
}

function solution23second(string) {
  const result = play(string, 1000000, 10000000);
  return result[0] * result[1];
}

module.exports = {
  solution23first: solution23first,
  solution23second: solution23second,
};
