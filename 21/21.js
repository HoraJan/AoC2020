function parseInput(string) {
  const foods = string.split("\n");
  const allergens = {};
  const fixedAllergens = {};
  let ingredients = [];
  foods.forEach((food) => {
    const { ings, algs } = food.match(
      /(?<ings>[\w|\s]+) \(contains (?<algs>[\w|\s|\,]+)\)/
    ).groups;
    const ingsArray = ings.split(" ");
    ingredients = [...ingredients, ...ingsArray];
    algs.split(", ").forEach((alg) => {
      if (allergens[alg]) {
        allergens[alg] = allergens[alg].filter((el) => ingsArray.includes(el));
        return;
      }
      allergens[alg] = ingsArray;
    });
  });

  while (Object.keys(allergens).length) {
    Object.entries(allergens).forEach(([alg, ings]) => {
      if (ings.length === 1) {
        fixedAllergens[alg] = ings[0];
        Object.keys(allergens).forEach(
          (key) =>
            (allergens[key] = allergens[key].filter((alg) => alg !== ings[0]))
        );
        delete allergens[alg];
      }
    });
  }

  return [fixedAllergens, ingredients];
}

function solution21first(string) {
  const [fixedAllergens, ingredients] = parseInput(string);
  const alergenIngredients = Object.values(fixedAllergens);

  return ingredients.filter((el) => !alergenIngredients.includes(el)).length;
}

function solution21second(string) {
  const [fixedAllergens] = parseInput(string);
  const response = Object.entries(fixedAllergens);
  response.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  });

  return response.map(([_al, ing]) => ing).join(",");
}

module.exports = {
  solution21first: solution21first,
  solution21second: solution21second,
};
