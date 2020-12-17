stringTest = `.#.
..#
###`;

sol = require("./17.js");

test("first part", () => {
  expect(sol.solution17first(stringTest)).toBe(112);
});

test("second part", () => {
  expect(sol.solution17second(stringTest)).toBe(848);
});
