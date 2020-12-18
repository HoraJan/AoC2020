function determineActive(count, current) {
  return (current === 1 && (count === 2 || count === 3)) ||
    (current === 0 && count === 3)
    ? 1
    : 0;
}

function countNeighbors(x, y, z, cube) {
  let count = 0;
  for (let zDiff = z - 1; zDiff <= z + 1; zDiff++) {
    for (let yDiff = y - 1; yDiff <= y + 1; yDiff++) {
      for (let xDiff = x - 1; xDiff <= x + 1; xDiff++) {
        if (xDiff === x && yDiff === y && zDiff === z) continue;

        count += cube.has(zDiff + "," + yDiff + "," + xDiff) ? 1 : 0;
      }
    }
  }
  const current = cube.has(z + "," + y + "," + x) ? 1 : 0;
  return determineActive(count, current);
}

function countNeighbors4D(x, y, z, zz, zzCubes) {
  let count = 0;
  for (let zzDiff = zz - 1; zzDiff <= zz + 1; zzDiff++) {
    for (let zDiff = z - 1; zDiff <= z + 1; zDiff++) {
      for (let yDiff = y - 1; yDiff <= y + 1; yDiff++) {
        for (let xDiff = x - 1; xDiff <= x + 1; xDiff++) {
          if (xDiff === x && yDiff === y && zDiff === z && zzDiff === zz)
            continue;

          count += zzCubes.has(zzDiff + "," + zDiff + "," + yDiff + "," + xDiff)
            ? 1
            : 0;
        }
      }
    }
  }
  const current = zzCubes.has(zz + "," + z + "," + y + "," + x) ? 1 : 0;
  return determineActive(count, current);
}

function createObjectFromString(string, length) {
  let yMin = 0,
    yMax = 0,
    xMin = 0,
    xMax = 0;
  const set = new Set();
  const layerObject = string.split("\n").forEach((line, lineIndex) => {
    let emptyLine = true;
    const lineObject = line.split("").forEach((point, pointIndex) => {
      if (point === "#") {
        const index =
          length === 4
            ? "0,0," + lineIndex + "," + pointIndex
            : "0," + lineIndex + "," + pointIndex;
        set.add(index);
        xMax = Math.max(xMax, pointIndex);
        emptyLine = false;
      }
    });
    if (emptyLine) return;

    yMax = Math.max(yMax, lineIndex);
  });
  return [set, yMax, yMin, xMax, xMin];
}

function solution17first(string) {
  let cube = new Set();
  let zMin = 0,
    zMax = 0,
    yMin = 0,
    yMax = 0,
    xMin = 0,
    xMax = 0;
  [cube, yMax, yMin, xMax, xMin] = createObjectFromString(string);

  let turn = 0;
  let oldCube = new Set();
  let newCube = cube;
  while (turn < 6) {
    oldCube = newCube;
    newCube = new Set();
    for (let z = zMin - 1; z <= zMax + 1; z++) {
      for (let y = yMin - 1; y <= yMax + 1; y++) {
        for (let x = xMin - 1; x <= xMax + 1; x++) {
          const active = countNeighbors(x, y, z, oldCube);
          if (!active) continue;
          newCube.add(z + "," + y + "," + x);

          zMin = Math.min(zMin, z);
          zMax = Math.max(zMax, z);
          yMin = Math.min(yMin, y);
          yMax = Math.max(yMax, y);
          xMin = Math.min(xMin, x);
          xMax = Math.max(xMax, x);
        }
      }
    }
    turn++;
  }

  return newCube.size;
}

function solution17second(string) {
  let zzCubes = new Set();
  let zzMin = 0;
  let zzMax = 0;
  let zMin = 0;
  let zMax = 0;
  let yMin = 0;
  let yMax = 0;
  let xMin = 0;
  let xMax = 0;
  [zzCubes, yMax, yMin, xMax, xMin] = createObjectFromString(string, 4);

  let turn = 0;
  let oldZzCubes = new Set();
  let newZzCubes = zzCubes;
  while (turn < 6) {
    oldZzCubes = newZzCubes;
    newZzCubes = new Set();
    for (let zz = zzMin - 1; zz <= zzMax + 1; zz++) {
      for (let z = zMin - 1; z <= zMax + 1; z++) {
        for (let y = yMin - 1; y <= yMax + 1; y++) {
          for (let x = xMin - 1; x <= xMax + 1; x++) {
            const active = countNeighbors4D(x, y, z, zz, oldZzCubes);
            if (!active) continue;
            newZzCubes.add(zz + "," + z + "," + y + "," + x);

            zzMin = Math.min(zzMin, zz);
            zzMax = Math.max(zzMax, zz);
            zMin = Math.min(zMin, z);
            zMax = Math.max(zMax, z);
            yMin = Math.min(yMin, y);
            yMax = Math.max(yMax, y);
            xMin = Math.min(xMin, x);
            xMax = Math.max(xMax, x);
          }
        }
      }
    }
    turn++;
  }

  return newZzCubes.size;
}

module.exports = {
  solution17first: solution17first,
  solution17second: solution17second,
};
