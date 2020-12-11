function getNeirbor(seats, x, y, xDir, yDir) {
  const line = seats[x + xDir];
  if (!line) return 0;
  if (line[y + yDir] === "#") return 1;
  return 0;
}

function getVisibleNeirbor(seats, x, y, xDir, yDir) {
  let multiply = 1;
  while (true) {
    const line = seats[x + xDir * multiply];
    if (!line) return 0;
    if (line[y + yDir * multiply] === "#") return 1;
    if (line[y + yDir * multiply] === "L") return 0;
    if (!line[y + yDir * multiply]) return 0;
    multiply++;
  }
}

function doTurn(seats, minNeir, getFunction) {
  return seats.map((line, lineIndex) => {
    return line.map((position, positionIndex) => {
      const upperLeft = getFunction(seats, lineIndex, positionIndex, -1, -1);
      const upper = getFunction(seats, lineIndex, positionIndex, -1, 0);
      const upperRight = getFunction(seats, lineIndex, positionIndex, -1, +1);
      const left = getFunction(seats, lineIndex, positionIndex, 0, -1);
      const right = getFunction(seats, lineIndex, positionIndex, 0, +1);
      const lowerLeft = getFunction(seats, lineIndex, positionIndex, +1, -1);
      const lower = getFunction(seats, lineIndex, positionIndex, +1, 0);
      const lowerRight = getFunction(seats, lineIndex, positionIndex, +1, +1);

      const nierbors =
        upperLeft +
        upper +
        upperRight +
        left +
        right +
        lowerLeft +
        lower +
        lowerRight;

      if (position === "L" && nierbors === 0) {
        return "#";
      }
      if (position === "#" && nierbors > minNeir) {
        return "L";
      }

      return position;
    });
  });
}

function getOccupied(seats) {
  return seats.reduce(
    (count, line) =>
      count + line.reduce((count, seat) => count + (seat === "#" ? 1 : 0), 0),
    0
  );
}

function solve(string, neirborCount, getFunction) {
  const seats = string.split("\n").map((line) => line.split(""));
  let occupied = -1;
  let newOccupied = getOccupied(seats);
  let newSeats = seats;

  while (occupied !== newOccupied) {
    occupied = newOccupied;
    newSeats = doTurn(newSeats, neirborCount, getFunction);
    newOccupied = getOccupied(newSeats);
  }

  return occupied;
}

function solution11first(string) {
  return solve(string, 3, getNeirbor);
}

function solution11second(string) {
  return solve(string, 4, getVisibleNeirbor);
}

module.exports = {
  solution11first: solution11first,
  solution11second: solution11second,
};
