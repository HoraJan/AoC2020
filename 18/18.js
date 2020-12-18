function singleSolve(match, nextFunction) {
  let [operation, first, operand, second] = match;
  first = parseInt(first);
  second = parseInt(second);
  const result = operand === "+" ? first + second : first * second;
  return nextFunction(
    match.input
      .replace(operation, result)
      .replace(/\((\d+)\)/, "$1")
      .trim()
  );
}

function firstSolve(string) {
  const final = string.match(/^\d+$/);
  if (final) return parseInt(string);

  const parenthesisContent = string.match(/\((?<content>[\d\+\*\s]*)\)/);
  if (parenthesisContent) {
    const content = firstSolve(parenthesisContent.groups.content);

    return firstSolve(string.replace(parenthesisContent[0], content));
  }

  const operation = string.match(
    /(?<first>\d+)\s(?<operand>[\+\*])\s(?<second>\d+)/
  );
  return singleSolve(operation, firstSolve);
}

function secondSolve(string) {
  const final = string.match(/^\d+$/);
  if (final) return parseInt(string);

  const parenthesisContent = string.match(/\((?<content>[\d\+\*\s]*)\)/);
  if (parenthesisContent) {
    const content = secondSolve(parenthesisContent.groups.content);

    return secondSolve(string.replace(parenthesisContent[0], content));
  }

  const operation = string.match(
    /(?<first>\d+)\s(?<operand>\+)\s(?<second>\d+)/
  );
  if (!operation) return solveMultiplication(string);

  return singleSolve(operation, secondSolve);
}

function solveMultiplication(string) {
  let operation = string.match(/(?<first>\d+)\s(?<operand>\*)\s(?<second>\d+)/);
  return singleSolve(operation, secondSolve);
}

function solution18first(string) {
  return string.split("\n").reduce((acc, curr) => acc + firstSolve(curr), 0);
}

function solution18second(string) {
  return string.split("\n").reduce((acc, curr) => acc + secondSolve(curr), 0);
}

module.exports = {
  solution18first: solution18first,
  solution18second: solution18second,
};
