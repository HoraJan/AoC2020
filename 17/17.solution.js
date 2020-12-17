sol = require("./17.js");
stringReal = require("./17.definition.js");
console.time("first");
console.log("First solution is: ", sol.solution17first(stringReal));
console.timeEnd("first");
console.time("second");
console.log("Second solution is: ", sol.solution17second(stringReal));
console.timeEnd("second");
