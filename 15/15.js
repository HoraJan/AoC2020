function solve(string, length) {
  const start = string.split(",");
  const spoken = new Map();
  let turn = 0;
  let lastSpoken = 0;
  let lastFirst = false;
  start.forEach((value, index) => {
    lastSpoken = parseInt(value);
    lastFirst = !spoken.has(lastSpoken);
    turn++;
    if (index === start.length) return;
    spoken.set(lastSpoken, turn);
  });

  while (turn !== length) {
    const age = lastFirst ? 0 : turn - spoken.get(lastSpoken);
    spoken.set(lastSpoken, turn);
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
