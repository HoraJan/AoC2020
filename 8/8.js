function program(instructions) {
  const visitedLines = new Set();
  let acc = 0;
  let index = 0;
  while (true) {
    if (visitedLines.has(index)) {
      return { value: acc, infinite: true };
    }

    if (index >= instructions.length) {
      return { value: acc, infinite: false };
    }
    const { operation, argument } = instructions[index];
    visitedLines.add(index);
    if (operation === "acc") {
      acc += parseInt(argument);
      index++;
      continue;
    }
    if (operation === "nop") {
      index++;
      continue;
    }
    if (operation === "jmp") {
      index += parseInt(argument);
      continue;
    }
  }
}

function getInstructions(arr) {
  const lines = arr.split("\n");
  const instructions = lines.map((line) => {
    const { operation, argument } = line.match(
      /(?<operation>nop|acc|jmp) \+?(?<argument>-?\d*)/
    ).groups;
    return { operation, argument };
  });
  return instructions;
}

function solution8first(arr) {
  const instructions = getInstructions(arr);
  return program(instructions).value;
}

function solution8second(arr) {
  const instructions = getInstructions(arr);

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    if (instruction === "acc") {
      continue;
    }
    const newInstructions = [...instructions];

    newInstructions[i] = {
      ...instruction,
      operation: instruction.operation === "jmp" ? "nop" : "jmp",
    };
    const result = program(newInstructions);

    if (!result.infinite) {
      return result.value;
    }
  }
}

module.exports = {
  solution8first: solution8first,
  solution8second: solution8second,
};
