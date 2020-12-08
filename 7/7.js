const MY_COLOR = "shiny gold";

function getColorsFromParentLevel(arr, colorArray, usedColors) {
  const uniqueColors = new Set([...usedColors, ...colorArray]);
  const currentColors = new Set();

  colorArray.forEach((upperColor) =>
    arr.forEach(([color, content]) =>
      content.forEach((subBag) => {
        if (subBag.color === upperColor && !uniqueColors.has(color)) {
          currentColors.add(color);
        }
      })
    )
  );

  if (currentColors.size) {
    return getColorsFromParentLevel(
      arr,
      Array.from(currentColors),
      Array.from(uniqueColors)
    );
  }

  return uniqueColors;
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
    const subBags = content.match(/\d+ [a-z]+ [a-z]+/g);
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
  const totalCount = getColorsFromParentLevel(ruleArray, [MY_COLOR], []);

  return totalCount.size - 1; // need to subtract `shiny gold`
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
