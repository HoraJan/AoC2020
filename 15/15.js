function solve(string, length) {
  const start = string.split(",");
  const spoken = new Map();
  let turn = 1;
  let lastSpoken = 0;
  let lastFirst = false;
  start.forEach((value, index) => {
    lastSpoken = parseInt(value);
    lastFirst = true;
    turn++;
    if (index === start.length) return;
    spoken.set(parseInt(value), turn - 1);
  });

  while (turn !== length + 1) {
    if (lastFirst) {
      spoken.set(lastSpoken, turn - 1);
      lastFirst = !spoken.has(0);
      lastSpoken = 0;
      turn++;
      continue;
    }
    const age = turn - 1 - spoken.get(lastSpoken);
    spoken.set(lastSpoken, turn - 1);
    lastSpoken = age;
    lastFirst = !spoken.has(age);
    turn++;

    continue;
  }

  return lastSpoken;
}

function solution15first(string) {
  return solve(string, 2020);
}

function solution15second(string) {
  return solve(string, 30000000);
}

module.exports = {
  solution15first: solution15first,
  solution15second: solution15second,
};
