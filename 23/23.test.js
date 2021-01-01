stringTest = `389125467`;

sol = require("./23.js");

test("first part", () => {
  expect(sol.solution23first(stringTest)).toBe("67384529");
});

// test("second part", () => {
//   expect(sol.solution23second(stringTest)).toBe(149245887792);
// });
