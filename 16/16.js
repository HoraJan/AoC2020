function checkValueInLimit(value, [min, max]) {
  return min <= value && value <= max;
}

function checkValueInLimits(value, [firstLimit, secondLimit]) {
  return (
    checkValueInLimit(value, firstLimit) ||
    checkValueInLimit(value, secondLimit)
  );
}

function solution16first(string) {
  console.time("first");
  const [definitions, _myTicket, otherTickets] = string.split("\n\n");
  const sections = definitions
    .match(/(\d+\-\d+)+/g)
    .map((section) => section.split("-"));

  const invalid = otherTickets
    .split(/,|\n/g)
    .map(Number)
    .filter((value) => {
      return (
        value && !sections.some((limit) => checkValueInLimit(value, limit))
      );
    });

  console.timeEnd("first");
  return invalid.reduce((acc, curr) => acc + curr);
}

function solution16second(string) {
  console.time("second");
  const [definitions, myTicket, otherTickets] = string.split("\n\n");

  const myNumbers = myTicket
    .split(/\n/g)
    .filter((_line, index) => index)
    .map((line) => line.split(",").map(Number))
    .flat();
  const possibilities = myNumbers.map((_v, i) => i);

  const sections = new Map();
  definitions.split("\n").forEach((line) => {
    const { name, start1, stop1, start2, stop2 } = line.match(
      /(?<name>[a-z ]+):\s(?<start1>\d+)\-(?<stop1>\d+)\sor\s(?<start2>\d+)\-(?<stop2>\d+)/
    ).groups;
    sections[name] = {
      possibleIndexes: [...possibilities],
      limits: [
        [start1, stop1],
        [start2, stop2],
      ],
    };
  });

  const otherNumbers = otherTickets
    .split(/\n/g)
    .filter((_line, index) => index)
    .map((line) => line.split(",").map(Number));

  otherNumbers.forEach((otherTicket) => {
    otherTicket.forEach((value, index) => {
      const validTicket = Object.values(sections).some(({ limits }) =>
        checkValueInLimits(value, limits)
      );

      if (!validTicket) return;

      Object.entries(sections).forEach(([key, { limits }]) => {
        const valid = checkValueInLimits(value, limits);
        if (valid) {
          return;
        }
        sections[key].possibleIndexes = sections[key].possibleIndexes.filter(
          (i) => i !== index
        );
        return;
      });
    });
  });

  const pairs = new Map();

  while (Object.values(pairs).length !== Object.values(sections).length) {
    Object.entries(sections).forEach(([key, { possibleIndexes }]) => {
      if (possibleIndexes.length === 1) {
        const [fixedPosition] = possibleIndexes;
        pairs[key] = fixedPosition;
        Object.entries(sections).forEach(([key, { possibleIndexes }]) => {
          sections[key].possibleIndexes = possibleIndexes.filter(
            (i) => i !== fixedPosition
          );
        });
      }
    });
  }
  const dValues = Object.entries(pairs)
    .filter(([key]) => key.startsWith("departure"))
    .map(([_key, value]) => value);

  console.timeEnd("second");
  return dValues.reduce((acc, curr) => {
    return acc * myNumbers[curr];
  }, 1);
}

module.exports = {
  solution16first: solution16first,
  solution16second: solution16second,
};
