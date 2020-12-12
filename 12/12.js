const quadrants = [
  [1, 1],
  [1, -1],
  [-1, -1],
  [-1, 1],
];

const vectors = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
};

function parseInstruction(instruction) {
  let { direction, steps } = instruction.match(
    /(?<direction>\w)(?<steps>\d*)/
  ).groups;
  steps = parseInt(steps);
  return {
    direction,
    steps,
  };
}

function moveShip(position, dir, steps) {
  const [diffX, diffY] = vectors[dir];

  position.x = position.x + steps * diffX;
  position.y = position.y + steps * diffY;
  return;
}

function moveWaypoint(position, dir, steps) {
  const [diffX, diffY] = vectors[dir];

  position.waypointX = position.waypointX + steps * diffX;
  position.waypointY = position.waypointY + steps * diffY;
  return;
}

function goForward(position, steps) {
  position.x = position.x + position.waypointX * steps;
  position.y = position.y + position.waypointY * steps;
  return;
}

function turn(direction, degrees, position) {
  const diff = direction === "R" ? 1 : -1;
  for (let i = 0; i < degrees / 90; i++) {
    let dir =
      position.waypointX >= 0
        ? position.waypointY >= 0
          ? 0
          : 1
        : position.waypointY >= 0
        ? 3
        : 2;
    dir = (dir + diff + 4) % 4;
    const [dirX, dirY] = quadrants[dir];
    const oldWaypointX = position.waypointX;
    position.waypointX = Math.abs(position.waypointY) * dirX;
    position.waypointY = Math.abs(oldWaypointX) * dirY;
  }

  return;
}

function followInstruciton(instructions, position, moveFunction) {
  instructions.forEach((instruction, index) => {
    const { direction, steps } = parseInstruction(instruction);
    if (direction === "F") {
      return goForward(position, steps);
    }

    if (direction === "R" || direction === "L") {
      return turn(direction, steps, position);
    }

    moveFunction(position, direction, steps);
  });
}

function solution12first(string) {
  const instructions = string.split("\n");
  const position = { x: 0, y: 0, waypointX: 1, waypointY: 0 };
  followInstruciton(instructions, position, moveShip);

  return Math.abs(position.x) + Math.abs(position.y);
}

function solution12second(string) {
  const instructions = string.split("\n");
  const position = { x: 0, y: 0, waypointX: 10, waypointY: 1 };
  followInstruciton(instructions, position, moveWaypoint);

  return Math.abs(position.x) + Math.abs(position.y);
}

module.exports = {
  solution12first: solution12first,
  solution12second: solution12second,
};
