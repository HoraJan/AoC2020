stringTest = `1 + 2 * 3 + 4 * 5 + 6`;

sol = require("./18.js");

test("first part", () => {
  expect(sol.solution18first(stringTest)).toBe(71);
});

test("first part", () => {
  expect(sol.solution18first("1 + (2 * 3) + (4 * (5 + 6))")).toBe(51);
});

test("first part", () => {
  expect(
    sol.solution18first(`2 * 3 + (4 * 5)
  5 + (8 * 3 + 9 + 3 * 4 * 3)
  5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
  ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`)
  ).toBe(26 + 437 + 12240 + 13632);
});

test("second part", () => {
  expect(sol.solution18second(stringTest)).toBe(231);
});

test("second part", () => {
  expect(sol.solution18second(`5 + (8 * 3 + 9 + 3 * 4 * 3)`)).toBe(1445);
});

test("second part", () => {
  expect(
    sol.solution18second(`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`)
  ).toBe(23340);
});

test("second part", () => {
  expect(sol.solution18second(`2 * 3 + (4 * 5)`)).toBe(46);
});

test("second part", () => {
  expect(
    sol.solution18second(`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`)
  ).toBe(669060);
});
