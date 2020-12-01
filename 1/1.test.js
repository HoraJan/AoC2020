arrTest = [1721, 979, 366, 299, 675, 1456];

sol = require("./1.js");

test("first part", () => {
  expect(sol.solution1first(arrTest)).toBe(514579);
});

test("second part", () => {
  expect(sol.solution1second(arrTest)).toBe(241861950);
});
