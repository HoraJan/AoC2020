sol = require("./19.js");
stringReal = require("./19.definition.js");
console.time("first");
console.log("First solution is: ", sol.solution19first(stringReal));
console.timeEnd("first");
console.time("second");
console.log("Second solution is: ", sol.solution19second(stringReal));
console.timeEnd("second");
