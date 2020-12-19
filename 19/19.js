function crossArrays(letters, rulesObject) {
  const response = [];
  if (letters.length === 1) {
    rulesObject[letters[0]].forEach((f) => {
      response.push(f);
    });
  }
  if (letters.length === 2) {
    rulesObject[letters[0]].forEach((f) => {
      rulesObject[letters[1]].forEach((s) => {
        response.push(f + s);
      });
    });
  }
  if (letters.length === 3) {
    rulesObject[letters[0]].forEach((f) => {
      rulesObject[letters[1]].forEach((s) => {
        rulesObject[letters[2]].forEach((t) => {
          response.push(f + s + t);
        });
      });
    });
  }
  return response;
}

function getObject(string) {
  const [rules, messages] = string.split("\n\n");
  let zeroRule = [];
  const rulesArray = rules
    .split("\n")
    .map((stringRule) => {
      const { ruleIndex, rule } = stringRule.match(
        /(?<ruleIndex>\d+): (?<rule>.*)/
      ).groups;
      return {
        ruleIndex,
        rule: rule.replace(/"/g, ""),
        dependencies: rule.replace(/\|/g, "").split(/\s+/g),
      };
    })
    .filter(({ ruleIndex, rule }) => {
      if (ruleIndex !== "0") {
        return true;
      }
      zeroRule = rule.split(" ");
    });

  const rulesObject = {};
  while (rulesArray.length) {
    for (let i = 0; i < rulesArray.length; i++) {
      const { ruleIndex, rule, dependencies } = rulesArray[i];

      if (rule.match(/a|b/)) {
        rulesObject[ruleIndex] = new Set();
        rulesObject[ruleIndex].add(rule);
        rulesArray.splice(i, 1);
        i--;
        continue;
      }

      const possible = dependencies.every((digit) => rulesObject[digit]);

      if (possible) {
        rulesObject[ruleIndex] = new Set();
        rule.split("|").forEach((substr) => {
          const letters = substr.trim().split(/\s+/g);
          crossArrays(letters, rulesObject).forEach((el) =>
            rulesObject[ruleIndex].add(el)
          );
        });

        rulesArray.splice(i, 1);
        i--;
      }
    }
  }

  return [messages, rulesObject, zeroRule];
}

function solution19first(string) {
  const [messages, rulesObject, zeroRule] = getObject(string);

  const inner = zeroRule
    .map((el) => "(" + [...rulesObject[el]].join("|") + ")")
    .join("");
  const reg = new RegExp("^(" + inner + ")$");

  return messages.split("\n").filter((message) => message.match(reg)).length;
}

function solution19second(string) {
  const [messages, rulesObject] = getObject(string);

  const fourthyTwo = [...rulesObject[42]].join("|");
  const thirtyOne = [...rulesObject[31]].join("|");
  const reg = new RegExp("^((" + fourthyTwo + "){2,})((" + thirtyOne + ")+)$");
  const filtered = messages.split("\n").filter((message) => {
    const match = message.match(reg);
    if (!match) return false;

    const firsts = match[1].length / match[2].length;
    const seconds = match[3].length / match[4].length;

    return firsts - seconds > 0;
  });

  return filtered.length;
}

module.exports = {
  solution19first: solution19first,
  solution19second: solution19second,
};
