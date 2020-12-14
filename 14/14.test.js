stringTest = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

stringTest2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`;

sol = require("./14.js");

test("first part", () => {
  expect(sol.solution14first(stringTest)).toBe(165);
});

test("second part", () => {
  expect(sol.solution14second(stringTest2)).toBe(208);
});
