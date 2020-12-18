const pRegExp = new RegExp(/(?<first>\d+)\s(?<operand>\+)\s(?<second>\d+)/);
const mRegExp = new RegExp(/(?<first>\d+)\s(?<operand>\*)\s(?<second>\d+)/);
const pmRegExp = new RegExp(
  /(?<first>\d+)\s(?<operand>[\+\*])\s(?<second>\d+)/
);
function singleSolve(match) {
  let [operation, first, operand, second] = match;
  first = parseInt(first);
  second = parseInt(second);
  const result = operand === "+" ? first + second : first * second;
  return match.input
    .replace(operation, result)
    .replace(/\((\d+)\)/, "$1")
    .trim();
}

function solveParenthesis(string, solver) {
  let parenthesisContent = string.match(/\((?<content>[\d\+\*\s]*)\)/);
  while (parenthesisContent) {
    const content = solver(parenthesisContent.groups.content);
    string = string.replace(parenthesisContent[0], content);
    parenthesisContent = string.match(/\((?<content>[\d\+\*\s]*)\)/);
  }

  return string;
}

function firstSolver(string) {
  string = solveParenthesis(string, firstSolver);

  let operation = string.match(pmRegExp);
  while (operation) {
    string = singleSolve(operation);
    operation = string.match(pmRegExp);
  }
  return parseInt(string);
}

function secondSolver(string) {
  string = solveParenthesis(string, secondSolver);

  let operation = string.match(pmRegExp);
  while (operation) {
    const plusOperation = string.match(pRegExp);
    if (plusOperation) {
      string = singleSolve(plusOperation);
      operation = string.match(pmRegExp);
      continue;
    }
    const multiplyOperation = string.match(mRegExp);
    string = singleSolve(multiplyOperation);
    operation = string.match(pmRegExp);
  }

  return parseInt(string);
}

function solution18first(string) {
  return string.split("\n").reduce((acc, curr) => acc + firstSolver(curr), 0);
}

function solution18second(string) {
  return string.split("\n").reduce((acc, curr) => acc + secondSolver(curr), 0);
}

module.exports = {
  solution18first: solution18first,
  solution18second: solution18second,
};
