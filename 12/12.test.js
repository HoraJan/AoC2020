stringTest = `F10
N3
F7
R90
F11`;

stringTest2 = `F10
L180
F10`;

sol = require("./12.js");

test("first part", () => {
  expect(sol.solution12first(stringTest)).toBe(25);
});

test("second part", () => {
  expect(sol.solution12second(stringTest)).toBe(286);
  expect(sol.solution12second(stringTest2)).toBe(0);
});
