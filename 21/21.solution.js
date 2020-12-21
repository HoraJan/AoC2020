sol = require("./21.js");
stringReal = require("./21.definition.js");
console.time("first");
console.log("First solution is: ", sol.solution21first(stringReal));
console.timeEnd("first");
console.time("second");
console.log("Second solution is: ", sol.solution21second(stringReal));
console.timeEnd("second");
