stringTest = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

sol = require("./9.js");

test("first part", () => {
  expect(sol.solution9first(stringTest, 5)).toBe(127);
});

test("second part", () => {
  expect(sol.solution9second(stringTest, 127)).toBe(62);
});
