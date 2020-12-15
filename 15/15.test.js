stringTest = `0,3,6`;

sol = require("./15.js");

test("first part", () => {
  expect(sol.solution15first(stringTest)).toBe(436);
});

test("second part", () => {
  expect(sol.solution15second(stringTest)).toBe(175594);
});
