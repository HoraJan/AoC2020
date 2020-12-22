stringTest = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

sol = require("./22.js");

test("first part", () => {
  expect(sol.solution22first(stringTest)).toBe(306);
});

test("second part", () => {
  expect(sol.solution22second(stringTest)).toBe(291);
});
