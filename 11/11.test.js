stringTest = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

sol = require("./11.js");

test("first part", () => {
  expect(sol.solution11first(stringTest)).toBe(37);
});

test("second part", () => {
  expect(sol.solution11second(stringTest)).toBe(26);
});
