stringTest = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;

sol = require("./3.js");

test("first part", () => {
  expect(sol.solution3first(stringTest)).toBe(7);
});

test("second part", () => {
  expect(sol.solution3second(stringTest)).toBe(336);
});
