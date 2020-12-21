stringTest = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;

sol = require("./21.js");

test("first part", () => {
  expect(sol.solution21first(stringTest)).toBe(5);
});

test("second part", () => {
  expect(sol.solution21second(stringTest)).toBe("mxmxvkd,sqjhc,fvjkl");
});
