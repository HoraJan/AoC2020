stringTest = `939
7,13,x,x,59,x,31,19`;

stringTest2 = `
17,x,13,19`;

sol = require("./13.js");

test("first part", () => {
  expect(sol.solution13first(stringTest)).toBe(295);
});

test("second part", () => {
  expect(sol.solution13second(stringTest)).toBe(1068781);
});

test("second part", () => {
  expect(sol.solution13second(stringTest2)).toBe(3417);
});

test("second part", () => {
  expect(sol.solution13second("\n1789,37,47,1889")).toBe(1202161486);
});

test("second part", () => {
  expect(sol.solution13second("\n67,7,x,59,61")).toBe(1261476);
});
