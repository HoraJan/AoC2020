function getVisibleNeighbor(seats, x, y, xDir, yDir, multiple) {
  let multiply = 1;
  if (xDir === 0 && yDir === 0) return 0;
  do {
    const line = seats[x + xDir * multiply];
    if (!line) return 0;
    if (line[y + yDir * multiply] === "#") return 1;
    if (line[y + yDir * multiply] === "L") return 0;
    if (!line[y + yDir * multiply]) return 0;
    multiply++;
  } while (multiple);
  return 0;
}

function countNeighbor(seats, line, seat, multiple) {
  let count = 0;
  for (let x = -1; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      count += getVisibleNeighbor(seats, line, seat, x, y, multiple);
    }
  }
  return count;
}

function doTurn(seats, minNeir, multiple) {
  return seats.map((line, lineIndex) => {
    return line.map((seat, seatIndex) => {
      const nierbors = countNeighbor(seats, lineIndex, seatIndex, multiple);
      if (seat === "L" && nierbors === 0) {
        return "#";
      }
      if (seat === "#" && nierbors > minNeir) {
        return "L";
      }

      return seat;
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

function solve(string, neighborCount, multiple) {
  const seats = string.split("\n").map((line) => line.split(""));
  let occupied = -1;
  let newOccupied = getOccupied(seats);
  let newSeats = seats;

  while (occupied !== newOccupied) {
    occupied = newOccupied;
    newSeats = doTurn(newSeats, neighborCount, multiple);
    newOccupied = getOccupied(newSeats);
  }

  return occupied;
}

function solution11first(string) {
  return solve(string, 3);
}

function solution11second(string) {
  return solve(string, 4, true);
}

module.exports = {
  solution11first: solution11first,
  solution11second: solution11second,
};
