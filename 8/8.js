function program(instructions) {
  const visitedLines = new Set();
  let acc = 0;
  let index = 0;
  while (true) {
    if (visitedLines.has(index)) {
      return { value: acc, infinite: true };
    }
    const nextCommand = instructions[index];
    if (!nextCommand) {
      break;
    }
    const { operation, argument } = nextCommand;
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
  return { value: acc, infinite: false };
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
  let changedIndex = -1;
  while (true) {
    const notChangedYetIndex = instructions.findIndex(
      (el, index) => el.operation !== "acc" && index > changedIndex
    );
    const notChangedYet = instructions[notChangedYetIndex];
    changedIndex = notChangedYetIndex;
    const newInstructions = [...instructions];

    newInstructions[changedIndex] = {
      ...notChangedYet,
      operation: notChangedYet.operation === "jmp" ? "nop" : "jmp",
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
