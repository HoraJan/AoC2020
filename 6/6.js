function reduceFunction(arr, defaultState, logicalFunction) {
  const groups = arr.split("\n\n");
  return groups.reduce((groupAcc, group) => {
    const people = group.split("\n");
    const fullResult = new Array(26).fill(defaultState);
    const groupResult = people
      .reduce((peopleAcc, person) => {
        const digitalPerson = person
          .split("")
          .map((letter) => letter.charCodeAt(0) - 97);
        return peopleAcc.map((el, index) =>
          logicalFunction(el, digitalPerson.includes(index))
        );
      }, fullResult)
      .filter(Boolean);
    return groupAcc + groupResult.length;
  }, 0);
}

function solution6first(arr) {
  return reduceFunction(arr, false, (a, b) => a || b);
}
function solution6second(arr) {
  return reduceFunction(arr, true, (a, b) => a && b);
}

module.exports = {
  solution6first: solution6first,
  solution6second: solution6second,
};
