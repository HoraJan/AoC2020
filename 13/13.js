function bezoutIdentity(a, b) {
  let x = a;
  let r = b;
  let s = 0;
  let y = 1;
  let t = 1;
  let z = 0;
  while (r) {
    q = Math.floor(parseInt(x / r));
    [x, r] = [r, x % r];
    [y, s] = [s, y - q * s];
    [z, t] = [t, z - q * t];
  }
  return [y % parseInt(b / x), z % parseInt(-a / x)];
}

function solution13first(string) {
  let [time, links] = string.split("\n");
  time = parseInt(time);
  let waitingTime = 9999;
  let nearestLink = -1;
  links.split(",").forEach((link) => {
    const id = parseInt(link);
    if (!Number(id)) return;
    const currWaitingTime = Math.ceil(time / id) * id - time;
    if (currWaitingTime < waitingTime) {
      waitingTime = currWaitingTime;
      nearestLink = id;
    }
  });
  return waitingTime * nearestLink;
}

function solution13second(string) {
  const [_time, links] = string.split("\n");
  const linksObject = {};
  links.split(",").forEach((link, index) => {
    const id = parseInt(link);
    if (Number(id)) linksObject[index] = BigInt(id);
  });

  const values = Object.values(linksObject).slice(0, 12);
  const keys = Object.entries(linksObject).map(
    ([key, value]) => BigInt(value) - (BigInt(key) % BigInt(value))
  );

  const response = values.reduce(
    (acc, value, index) => {
      if (!index) {
        return [value, keys[index]];
      }

      const n1 = value;
      const n2 = acc[0];
      const bi = bezoutIdentity(n2, n1);
      const a1 = keys[index];
      const a2 = acc[1];
      const m1 = BigInt(bi[1]);
      const m2 = BigInt(bi[0]);
      const firstRest = a1 * m2 * n2 + a2 * m1 * n1;
      let divider = Math.floor(parseFloat(firstRest / (n1 * n2)));
      if (divider < 0) {
        divider -= 1;
      }
      const minimaxeResult = firstRest - BigInt(divider) * n1 * n2;

      return [acc[0] * value, minimaxeResult];
    },
    [null, null]
  );

  return parseInt(response[1]);
}

module.exports = {
  solution13first: solution13first,
  solution13second: solution13second,
};
