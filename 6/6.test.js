stringTest = `abc

a
b
c

ab
ac

a
a
a
a

b`;

sol = require("./6.js");

test("first part", () => {
  expect(sol.solution6first(stringTest)).toBe(11);
});

test("second part", () => {
  expect(sol.solution6second(stringTest)).toBe(6);
});
