function alreadyPlayed(
  firstDeck,
  secondDeck,
  firstPlayedDecks,
  secondPlayedDecks
) {
  return (
    firstPlayedDecks.includes(firstDeck) ||
    secondPlayedDecks.includes(secondDeck)
  );
}

function play(player1, player2, recursive) {
  const firstPlayedDecks = [];
  const secondPlayedDecks = [];
  while (player1.length && player2.length) {
    if (recursive) {
      const firstDeck = player1.join(",");
      const secondDeck = player2.join(",");
      if (
        alreadyPlayed(
          firstDeck,
          secondDeck,
          firstPlayedDecks,
          secondPlayedDecks
        )
      ) {
        return [[], 1];
      }
      firstPlayedDecks.push(firstDeck);
      secondPlayedDecks.push(secondDeck);
    }

    const firstPlayer = player1.shift();
    const secondPlayer = player2.shift();
    const innerGame =
      recursive &&
      firstPlayer <= player1.length &&
      secondPlayer <= player2.length;

    if (innerGame) {
      const innerGameResult = play(
        [...player1].slice(0, firstPlayer),
        [...player2].slice(0, secondPlayer),
        true
      );

      if (innerGameResult[1] === 1) {
        player1.push(firstPlayer);
        player1.push(secondPlayer);
        continue;
      }
      player2.push(secondPlayer);
      player2.push(firstPlayer);
      continue;
    }

    if (firstPlayer > secondPlayer) {
      player1.push(firstPlayer);
      player1.push(secondPlayer);
      continue;
    }
    player2.push(secondPlayer);
    player2.push(firstPlayer);
  }

  return [[...player1, ...player2], player1.length ? 1 : 2];
}

function countPoints(deck) {
  const length = deck.length;
  const response = deck.reduce(
    (acc, curr, index) => acc + curr * (length - index),
    0
  );

  return response;
}

function solution22first(string) {
  const players = string.split("\n\n");
  const [player1, player2] = players.map((player) =>
    player
      .split("\n")
      .slice(1)
      .map((el) => parseInt(el))
  );

  const [result] = play(player1, player2);

  return countPoints(result);
}

function solution22second(string) {
  const players = string.split("\n\n");
  const [player1, player2] = players.map((player) =>
    player
      .split("\n")
      .slice(1)
      .map((el) => parseInt(el))
  );

  const [result] = play(player1, player2, true);

  return countPoints(result);
}

module.exports = {
  solution22first: solution22first,
  solution22second: solution22second,
};
