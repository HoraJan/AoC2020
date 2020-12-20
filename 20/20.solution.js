sol = require("./20.js");
stringReal = require("./20.definition.js");
console.time("first");
console.log("First solution is: ", sol.solution20first(stringReal));
console.timeEnd("first");
console.time("second");
console.log("Second solution is: ", sol.solution20second(stringReal));
console.timeEnd("second");
