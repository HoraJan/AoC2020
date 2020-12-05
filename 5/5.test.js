sol = require("./5.js");

test("first part", () => {
  expect(sol.solution5first("BFFFBBFRRR")).toBe(567);
  expect(sol.solution5first("FFFBBBFRRR")).toBe(119);
  expect(sol.solution5first("BBFFBBFRLL")).toBe(820);
});

// test("second part", () => {
//   expect(sol.solution4second(stringTest2Invalid)).toBe(0);
//   expect(sol.solution4second(stringTest2Valid)).toBe(4);
// });
