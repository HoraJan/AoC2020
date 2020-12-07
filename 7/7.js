const MY_COLOR = "shiny gold";

function getAnotherLevel(arr, colorArray, uniqueColors) {
  colorArray.forEach((color) => (uniqueColors[color] = true));

  const currentColors = {};

  colorArray.forEach((upperColor) =>
    arr.forEach(([color, content]) =>
      content.forEach((subBag) => {
        if (subBag.color === upperColor && !uniqueColors[color]) {
          currentColors[color] = true;
        }
      })
    )
  );

  if (Object.keys(currentColors).length) {
    getAnotherLevel(arr, Object.keys(currentColors), uniqueColors);
  }

  return Object.keys(uniqueColors);
}

function getSubCount(object, subBags) {
  const childBags = subBags.map((subBag) => {
    const children = object[subBag.color];
    if (!children) {
      return parseInt(subBag.count);
    }
    const anotherLevel = getSubCount(object, children);

    return parseInt(subBag.count) * (anotherLevel + 1);
  });
  return childBags.reduce((acc, curr) => acc + curr, 0);
}

function parseRules(arr) {
  const object = {};
  const rules = arr.split("\n");
  rules.forEach((rule) => {
    const { color, content } = rule.match(
      /(?<color>[a-z]+\s[a-z]+) bags contain (?<content>.*)/
    ).groups;
    const subBags = content.match(/((\d+) ([a-z]+ [a-z]+))/g);
    if (!subBags) {
      // no content
      return;
    }
    object[color] = subBags.map((subBag) => ({
      ...subBag.match(/(?<count>\d+) (?<color>[a-z]+ [a-z]+)/).groups,
    }));
  });
  return object;
}

function solution7first(arr) {
  const ruleObject = parseRules(arr);
  const ruleArray = Object.entries(ruleObject);
  const directParent = getAnotherLevel(ruleArray, [MY_COLOR], {});

  return directParent.length - 1;
}
function solution7second(arr) {
  const ruleObject = parseRules(arr);
  const totalCount = getSubCount(ruleObject, ruleObject[MY_COLOR]);
  return totalCount;
}

module.exports = {
  solution7first: solution7first,
  solution7second: solution7second,
};
