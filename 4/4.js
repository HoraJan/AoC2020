const MANDATORY_FIELDS = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  "cid",
];

function validation(type, value) {
  if (type === "byr") {
    return parseInt(value) >= 1920 && parseInt(value) <= 2002;
  }
  if (type === "iyr") {
    return parseInt(value) >= 2010 && parseInt(value) <= 2020;
  }
  if (type === "eyr") {
    return parseInt(value) >= 2020 && parseInt(value) <= 2030;
  }
  if (type === "hgt") {
    const cm = value.match(/(\d*)cm/);
    if (cm) {
      return cm[1] >= 150 && cm[1] <= 193;
    }
    const inch = value.match(/(\d*)in/);
    if (inch) {
      return inch[1] >= 59 && inch[1] <= 76;
    }

    return false;
  }
  if (type === "hcl") {
    return !!value.match(/#[0-9a-f]{6}/);
  }
  if (type === "ecl") {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
  }
  if (type === "pid") {
    return !!value.match(/[0-9]{9}/) && value.length === 9;
  }
}

function passportValidation(arr, validationFunction) {
  const passports = arr.split("\n\n");
  const valid = passports.filter((passport) => {
    const pairs = passport.match(/(\w*:[#\w\d]*)\s?/g);
    const keyPairs = pairs.map((pair) => pair.trim().split(":"));
    const object = {};
    keyPairs.forEach(([key, value]) =>
      validationFunction(key, value) ? (object[key] = value) : null
    );
    const missingFields = MANDATORY_FIELDS.filter(
      (field) => !object[field] && field !== "cid"
    );
    return missingFields.length === 0;
  });
  return valid.length;
}

function solution4first(arr) {
  return passportValidation(arr, () => true);
}
function solution4second(arr) {
  return passportValidation(arr, validation);
}

module.exports = {
  solution4first: solution4first,
  solution4second: solution4second,
  validation: validation,
};
