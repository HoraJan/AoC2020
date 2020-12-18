sol = require("./18.js");
stringReal = require("./18.definition.js");
console.time("first");
console.log("First solution is: ", sol.solution18first(stringReal));
console.timeEnd("first");
console.time("second");
console.log("Second solution is: ", sol.solution18second(stringReal));
console.timeEnd("second");
