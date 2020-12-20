const monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `;

function findEdges(string) {
  const tiles = string.split("\n\n");
  const edges = new Map();
  const tilesMap = new Map();
  tiles.forEach((tile) => {
    const { number } = tile.match(/Tile (?<number>\d+):/).groups;
    const lines = tile.split("\n");
    tilesMap.set(number, lines.slice(1).join("\n"));
    const front = lines.slice(1).map((line) => line[0]);
    const back = lines.slice(1).map((line) => line[9]);
    const tileEdges = {
      top: lines[1],
      bottom: lines[10],
      topR: lines[1].split("").reverse().join(""),
      bottomR: lines[10].split("").reverse().join(""),
      front: front.join(""),
      frontR: front.reverse().join(""),
      back: back.join(""),
      backR: back.reverse().join(""),
    };
    Object.entries(tileEdges).forEach(([edgeName, tileEdge]) => {
      if (edges.has(tileEdge)) {
        edges.get(tileEdge).push(number + "-" + edgeName);
        return;
      }
      edges.set(tileEdge, [number + "-" + edgeName]);
    });
  });
  const filteredEdges = [...edges].filter(([_edge, connections]) => {
    return !connections[0].endsWith("R");
  });

  return [filteredEdges, tilesMap];
}

function getConnections(edges) {
  const connections = new Map();
  edges.forEach(([_edge, pairs]) => {
    if (!pairs[1]) return;
    const from = parseInt(pairs[0]);
    const to = parseInt(pairs[1]);
    if (!connections.has(from)) {
      connections.set(from, new Set());
    }
    connections.get(from).add(to);

    if (!connections.has(to)) {
      connections.set(to, new Set());
    }
    connections.get(to).add(from);
  });

  return connections;
}

function placeTiles(connections) {
  let [firstTile, firstConnections] = [...connections].find(
    ([_tile, connection]) => connection.size === 2
  );

  firstConnections = [...firstConnections];

  const puzzle = [[firstTile, firstConnections[0]], [firstConnections[1]]];
  let currentRow = 1;
  let currentColumn = 1;
  let unplacedTiles = [...connections]
    .map(([tile]) => tile)
    .filter(
      (tile) =>
        tile !== firstTile &&
        tile !== firstConnections[0] &&
        tile !== firstConnections[1]
    );

  while (unplacedTiles.length) {
    const top =
      currentRow !== 0
        ? [
            ...connections.get(puzzle[currentRow - 1][currentColumn]),
          ].filter((el) => unplacedTiles.includes(el))
        : null;
    const left =
      currentColumn !== 0
        ? [
            ...connections.get(puzzle[currentRow][currentColumn - 1]),
          ].filter((el) => unplacedTiles.includes(el))
        : null;

    const nextTile =
      currentRow !== 0 && currentColumn !== 0
        ? top.find((el) => left.includes(el))
        : currentRow === 0
        ? left[0]
        : top[0];
    unplacedTiles = unplacedTiles.filter((el) => el !== nextTile);

    if (!puzzle[currentRow]) puzzle[currentRow] = [];
    puzzle[currentRow][currentColumn] = nextTile;
    if (left && left.length === 2 && currentColumn === 1) {
      currentRow++;
      currentColumn--;
      continue;
    }
    if (currentColumn === 0) {
      currentColumn++;
      continue;
    }

    if (puzzle[currentRow + 1]) {
      currentRow++;
      continue;
    }
    currentColumn++;
    currentRow = 0;
  }

  return puzzle;
}

function verticalFlip(tile) {
  return tile.split("\n").reverse().join("\n");
}

function rotate(tile) {
  const matrix = tile.split("\n").map((line) => line.split(""));
  return matrix[0]
    .map((val, index) => matrix.map((row) => row[index]).reverse())
    .map((line) => line.join(""))
    .join("\n");
}

function rotateTiles(puzzle, tiles, filteredEdges) {
  const firstTileIndex = puzzle[0][0];
  const newTiles = new Map();

  const firstTile = verticalFlip(tiles.get(firstTileIndex.toString()));
  newTiles.set(firstTileIndex, firstTile);
  let currentRow = 1;
  let currentColumn = 0;
  let nextTile = puzzle[currentRow][currentColumn];

  while (nextTile) {
    let currentTile = tiles.get(nextTile.toString());
    let previousIndex = puzzle[currentRow][currentColumn - 1];
    let side = "left";

    if (currentRow !== 0) {
      side = "top";
      previousIndex = puzzle[currentRow - 1][currentColumn];
    }

    previousTile = newTiles.get(previousIndex);
    const previousEdge =
      side === "top"
        ? previousTile.split("\n").pop()
        : previousTile
            .split("\n")
            .map((el) => el[el.length - 1])
            .join("");

    let rotating = 0;
    while (true) {
      const currentEdge =
        side === "top"
          ? currentTile.split("\n")[0]
          : currentTile
              .split("\n")
              .map((el) => el[0])
              .join("");

      if (previousEdge === currentEdge) break;

      if (rotating === 3) {
        currentTile = verticalFlip(currentTile);
        rotating++;
        continue;
      }

      rotating++;
      currentTile = rotate(currentTile);
    }

    newTiles.set(nextTile, currentTile);

    if (puzzle[currentRow + 1]) {
      currentRow++;
      nextTile = puzzle[currentRow][currentColumn];
      continue;
    }
    currentRow = 0;
    currentColumn++;
    nextTile = puzzle[currentRow][currentColumn];
  }

  return newTiles;
}

function renderImage(puzzle, tiles) {
  let image = "";
  let currentRow = 0;
  while (puzzle[currentRow]) {
    const currentPuzzles = puzzle[currentRow].map((index) =>
      tiles.get(index).split("\n")
    );
    let currentPuzzleRow = 1;
    while (currentPuzzles[0][currentPuzzleRow + 1]) {
      currentPuzzles.forEach((tile) => {
        image += tile[currentPuzzleRow].slice(1, -1);
      });
      image += "\n";
      currentPuzzleRow++;
    }
    currentRow++;
  }

  return image;
}

function findMonster(image, mosterIndexes, monsterX, monsterY) {
  const lines = image.split("\n");
  let found = false;

  for (let x = 0; x < lines.length - monsterX; x++) {
    for (let y = 0; y < lines[0].length - monsterY; y++) {
      const match = mosterIndexes.every(([monsterX, monsterY]) => {
        return lines[monsterX + x][monsterY + y] !== " ";
      });
      if (match) {
        found = true;
        mosterIndexes.forEach(
          ([monsterX, monsterY]) =>
            (lines[monsterX + x] = lines[monsterX + x]
              .split("")
              .map((el, index) => (index === monsterY + y ? "0" : el))
              .join(""))
        );
      }
    }
  }

  return [lines.join("\n"), found];
}

function solution20first(string) {
  const [filteredEdges] = findEdges(string);
  const connections = getConnections(filteredEdges);

  return [...connections]
    .filter(([_tile, connections]) => connections.size === 2)
    .reduce((acc, curr) => acc * curr[0], 1);
}

function solution20second(string) {
  const [filteredEdges, tiles] = findEdges(string);
  const connections = getConnections(filteredEdges);

  const puzzle = placeTiles(connections);

  const rotatedTiles = rotateTiles(puzzle, tiles, filteredEdges);
  let image = renderImage(puzzle, rotatedTiles)
    .replace(/\./g, " ")
    .replace(/#/g, ".");

  let rotating = 0;

  const mosterIndexes = [];
  let monsterX = 0;
  let monsterY = 0;

  monster.split("\n").forEach((line, lineIndex) => {
    monsterX = Math.max(monsterX, lineIndex);
    line.split("").forEach((el, elIndex) => {
      monsterY = Math.max(monsterY, elIndex);
      if (el === "#") {
        mosterIndexes.push([lineIndex, elIndex]);
      }
    });
  });

  while (rotating < 8) {
    [image, found] = findMonster(image, mosterIndexes, monsterX, monsterY);
    if (found) break;
    if (rotating === 3) {
      image = verticalFlip(image);
      rotating++;
      continue;
    }

    rotating++;
    image = rotate(image);
  }

  console.log(image);

  return image.match(/\./g).length;
}

module.exports = {
  solution20first: solution20first,
  solution20second: solution20second,
};
