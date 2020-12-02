stringTest = `1-3 a: abcde
  1-3 b: cdefg
  2-9 c: ccccccccc`;

sol = require("./2.js");

test("first part", () => {
  expect(sol.solution2first(stringTest)).toBe(2);
});

test("second part", () => {
  expect(sol.solution2second(stringTest)).toBe(1);
});
