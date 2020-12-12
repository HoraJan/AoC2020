function getVisibleNeighbor(seats, x, y, xDir, yDir, checkWholeRay) {
  let distance = 1;
  if (xDir === 0 && yDir === 0) return 0;
  do {
    const line = seats[x + xDir * distance];
    if (!line) return 0;
    const checkedSeat = line[y + yDir * distance];
    if (!checkedSeat) return 0;
    if (checkedSeat === "#") return 1;
    if (checkedSeat === "L") return 0;
    distance++;
  } while (checkWholeRay);
  return 0;
}

function countNeighbors(seats, line, seat, multiple) {
  let count = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      count += getVisibleNeighbor(seats, line, seat, x, y, multiple);
    }
  }
  return count;
}

function doTurn(seats, minNeighbor, checkWholeRay) {
  return seats.map((line, lineIndex) => {
    return line
      .split("")
      .map((seat, seatIndex) => {
        const neighbors = countNeighbors(
          seats,
          lineIndex,
          seatIndex,
          checkWholeRay
        );

        if (seat === "L" && neighbors === 0) return "#";
        if (seat === "#" && neighbors >= minNeighbor) return "L";
        return seat;
      })
      .join("");
  });
}

function getOccupied(seats) {
  const hashes = seats.join().match(/#/g);
  if (!hashes) return 0;

  return hashes.length;
}

function solve(string, neighborCount, checkWholeRay) {
  const seats = string.split("\n");
  let occupied = -1;
  let newOccupied = getOccupied(seats);
  let newSeats = seats;

  while (occupied !== newOccupied) {
    occupied = newOccupied;
    newSeats = doTurn(newSeats, neighborCount, checkWholeRay);
    newOccupied = getOccupied(newSeats);
  }

  return occupied;
}

function solution11first(string) {
  return solve(string, 4);
}

function solution11second(string) {
  return solve(string, 5, true);
}

module.exports = {
  solution11first: solution11first,
  solution11second: solution11second,
};
