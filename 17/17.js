function determineActive(count, current) {
  return (current === 1 && (count === 2 || count === 3)) ||
    (current === 0 && count === 3)
    ? 1
    : 0;
}

function getElement(object, indexArray) {
  if (!indexArray.length) return object ? 1 : 0;

  const index = indexArray.pop();
  return object[index] ? getElement(object[index], indexArray) : 0;
}

function countNeighbors(x, y, z, zLayers) {
  let count = 0;
  for (let zDiff = z - 1; zDiff <= z + 1; zDiff++) {
    for (let yDiff = y - 1; yDiff <= y + 1; yDiff++) {
      for (let xDiff = x - 1; xDiff <= x + 1; xDiff++) {
        if (xDiff === x && yDiff === y && zDiff === z) continue;

        count += getElement(zLayers, [xDiff, yDiff, zDiff]);
      }
    }
  }
  const current = getElement(zLayers, [x, y, z]);
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

          count += getElement(zzCubes, [xDiff, yDiff, zDiff, zzDiff]);
        }
      }
    }
  }
  const current = getElement(zzCubes, [x, y, z, zz]);
  return determineActive(count, current);
}

function countValues(object) {
  return Object.values(object).reduce((acc, curr) => {
    if (typeof curr === "object") return acc + countValues(curr);
    return acc + curr;
  }, 0);
}

function createObjectFromString(string) {
  let yMin = 0,
    yMax = 0,
    xMin = 0,
    xMax = 0;
  const layerObject = string.split("\n").reduce((lineAcc, line, lineIndex) => {
    const lineObject = line.split("").reduce((acc, point, pointIndex) => {
      if (point === "#") {
        acc[pointIndex] = 1;
        xMax = Math.max(xMax, pointIndex);
      }
      return acc;
    }, {});
    if (Object.keys(lineObject).length) {
      lineAcc[lineIndex] = lineObject;
      yMax = Math.max(yMax, lineIndex);
    }

    return lineAcc;
  }, {});
  return [{ 0: layerObject }, yMax, yMin, xMax, xMin];
}

function solution17first(string) {
  let cube = {};
  let zMin = 0,
    zMax = 0,
    yMin = 0,
    yMax = 0,
    xMin = 0,
    xMax = 0;
  [cube, yMax, yMin, xMax, xMin] = createObjectFromString(string);

  let turn = 0;
  let oldCube = {};
  let newCube = cube;
  while (turn < 6) {
    oldCube = newCube;
    newCube = {};
    for (let z = zMin - 1; z <= zMax + 1; z++) {
      for (let y = yMin - 1; y <= yMax + 1; y++) {
        for (let x = xMin - 1; x <= xMax + 1; x++) {
          const active = countNeighbors(x, y, z, oldCube);
          if (!active) continue;
          if (!newCube[z]) newCube[z] = {};
          if (!newCube[z][y]) newCube[z][y] = {};
          newCube[z][y][x] = 1;

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

  return countValues(newCube);
}

function solution17second(string) {
  const zzCubes = { 0: {} };
  let zzMin = 0;
  let zzMax = 0;
  let zMin = 0;
  let zMax = 0;
  let yMin = 0;
  let yMax = 0;
  let xMin = 0;
  let xMax = 0;
  [cube, yMax, yMin, xMax, xMin] = createObjectFromString(string);
  zzCubes[0] = cube;

  let turn = 0;
  let oldZzCubes = {};
  let newZzCubes = zzCubes;
  while (turn < 6) {
    oldZzCubes = newZzCubes;
    newZzCubes = {};
    for (let zz = zzMin - 1; zz <= zzMax + 1; zz++) {
      for (let z = zMin - 1; z <= zMax + 1; z++) {
        for (let y = yMin - 1; y <= yMax + 1; y++) {
          for (let x = xMin - 1; x <= xMax + 1; x++) {
            const active = countNeighbors4D(x, y, z, zz, oldZzCubes);
            if (!active) continue;
            if (!newZzCubes[zz]) newZzCubes[zz] = {};
            if (!newZzCubes[zz][z]) newZzCubes[zz][z] = {};
            if (!newZzCubes[zz][z][y]) newZzCubes[zz][z][y] = {};
            newZzCubes[zz][z][y][x] = 1;

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

  return countValues(newZzCubes);
}

module.exports = {
  solution17first: solution17first,
  solution17second: solution17second,
};
