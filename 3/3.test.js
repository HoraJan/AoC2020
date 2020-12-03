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
  expect(sol.solution3first(stringTest, 3, 1)).toBe(7);
});

test("second part", () => {
  expect(sol.solution3second(stringTest)).toBe(336);
});
