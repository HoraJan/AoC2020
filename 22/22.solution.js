sol = require("./22.js");
stringReal = require("./22.definition.js");
console.time("first");
console.log("First solution is: ", sol.solution22first(stringReal));
console.timeEnd("first");
console.time("second");
console.log("Second solution is: ", sol.solution22second(stringReal));
console.timeEnd("second");
