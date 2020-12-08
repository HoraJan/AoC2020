stringTest = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

sol = require("./8.js");

test("first part", () => {
  expect(sol.solution8first(stringTest)).toBe(5);
});

test("second part", () => {
  expect(sol.solution8second(stringTest)).toBe(8);
});
